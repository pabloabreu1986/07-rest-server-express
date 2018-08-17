'use-strict';

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const app = express();
const Usuario = require('../../models/usuario');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//login route
app.post('/login', (req, res) => {
  let body = req.body;

  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        OK: false,
        err
      });
    }

    if (!usuarioDB) {
      return res.status(404).json({
        OK: false,
        email: body.email + 'hola',
        message: '(Usuario) o password no válido'
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(404).json({
        OK: false,
        message: 'Usuario o (password) no válido'
      });
    }

    let token = jwt.sign(
      {
        usuario: usuarioDB
      },
      process.env.SEED,
      { expiresIn: process.env.CAD_TOKEN }
    );

    res.json({
      OK: true,
      usuario: _.pick(usuarioDB, ['_id', 'nombre', 'email', 'img', 'role', 'estado', 'google']),
      token
    });
  });
});

//configuraciones de google
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const payload = ticket.getPayload();

  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  };
}

app.post('/google', async (req, res) => {
  let token = req.body.idtoken;

  let googleUser = await verify(token).catch(e => {
    return res.status(403).json({
      OK: false,
      err: e
    });
  });

  Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        OK: false,
        err
      });
    }

    if (usuarioDB) {
      if (usuarioDB.google === false) {
        return res.status(500).json({
          OK: false,
          err: {
            message: 'Debe usar su autenticación normal'
          }
        });
      } else {
        let token = jwt.sign(
          {
            usuario: usuarioDB
          },
          process.env.SEED,
          { expiresIn: process.env.CAD_TOKEN }
        );

        return res.json({
          OK: true,
          usuario: usuarioDB,
          token
        });
      }
    } else {
      // cuando el usuario no existe
      let usuario = new Usuario();

      usuario.nombre = googleUser.nombre;
      usuario.email = googleUser.email;
      usuario.img = googleUser.img;
      usuario.google = true;
      usuario.password = ':)';

      usuario.save((err, usuarioDB) => {
        if (err) {
          return res.status(500).json({
            OK: false,
            err
          });
        }

        let token = jwt.sign(
          {
            usuario: usuarioDB
          },
          process.env.SEED,
          { expiresIn: process.env.CAD_TOKEN }
        );

        return res.json({
          OK: true,
          usuario: usuarioDB,
          token
        });
      });
    }
  });
});

module.exports = app;
