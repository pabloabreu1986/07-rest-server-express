'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Usuario = require('../../models/usuario');
const { verificarToken, verificarAdminRole } = require('../../middlewares/auth');

//obtiene solo os usuarios activos (estado: true)
app.get('/usuarios', verificarToken, (req, res) => {
  let desde = Number(req.query.d) || 0;
  let paginado = Number(req.query.p) || 5;

  Usuario.find({ estado: true }, '_id nombre email google estado')
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

module.exports = app;
