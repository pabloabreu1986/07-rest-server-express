'use-strict';

const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../../models/usuario');
const {verificarToken, verificarAdminRole} = require('../../middlewares/auth');

app.post('/usuario', [verificarToken,verificarAdminRole], (req, res) => {
  
    let body = req.body;

    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      img: body.img,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role
    });

    usuario.save((err, usuarioDB) => {

          if (err) {
            return res.status(400).json({
              OK: false,
              err
            });
          }
        res.status(201).json({
          CREATED: true,
          usuario: _.pick(usuarioDB,['_id','nombre', 'email','img','role','estado','google'])
        });
    });  
});

module.exports = app;