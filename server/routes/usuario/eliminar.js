'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Usuario = require('../../models/usuario');
const {verificarToken, verificarAdminRole} = require('../../middlewares/auth');

//no elimina, cambia el estado a falso
app.delete('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {

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
    };
  
    if (!usuarioBorrado) {
      return res.status(404).json({
        DELETED: false,
        err:{
          message: 'User not found'
        }
      });
    };
    res.json({
      DELETED: true,
      usuario: usuarioBorrado
    });
  });
});

module.exports = app;