'use-strict';

const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');
const {verificarToken, verificarAdminRole} = require('../middlewares/auth');


//obtiene solo os usuarios activos (estado: true)
app.get('/usuario', verificarToken, (req, res) => {

  let desde = Number(req.query.d) || 0;
  let paginado = Number(req.query.p) || 5;

  Usuario.find({estado: true}, '_id nombre email google estado')
        .skip(desde)
        .limit(paginado)
        .exec((err, usuarios) => {

          if (err) {
            return res.status(400).json({
              OK: false,
              err
            });
          }           
             res.json({
              OK: true,
              RANGO: `${desde} - ${desde + paginado}`,
              CANT: usuarios.length,
              usuarios
            });          
        });    
});
  
app.post('/usuario', [verificarToken,verificarAdminRole], (req, res) => {
  
    let body = req.body;

    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
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
        res.json({
          CREATED: true,
          usuario: _.pick(usuarioDB,['_id','nombre', 'email','img','role','estado','google'])
        });
    });  
});
  
app.put('/usuario/:id', [verificarToken,verificarAdminRole], (req, res) => {

    let id = req.params.id;

    //elegir cuales son los campos válidos de lo que vienen en el req.body
    let body =  _.pick( req.body, ['nombre', 'email','img','role','estado']);   

    Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDB) => {

        if (err) {
          return res.status(400).json({
            OK: false,
            err
          });
        }
      let newU = _.pick(usuarioDB,['_id','nombre', 'email','img','role','estado','google']);
        res.json({
          UPDATED: true,
          usuario: newU
        });
    });
});
  
//no elimina, cambia el estado a falso
app.delete('/usuario/:id', [verificarToken,verificarAdminRole], (req, res) => {

  let id = req.params.id;

  let cambiaEstado = {
    estado: false
  }

  Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {

    if (err) {
      return res.status(400).json({
        DELETED: false,
        err
      });
    }

    if (!usuarioBorrado) {
      return res.status(404).json({
        DELETED: false,
        err:{
          message: 'User not found'
        }
      });
    }

    res.json({
      DELETED: true,
      usuario: usuarioBorrado
    });
  });
});

module.exports = app;