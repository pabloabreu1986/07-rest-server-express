'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Usuario = require('../../models/usuario');
const { verificarToken } = require('../../middlewares/auth');

// //obtiene solo os usuarios activos (estado: true)
app.get('/usuario/:id', verificarToken, (req, res) => {
  let id = req.params.id;

  Usuario.findOne({ _id: id }, '_id nombre email google estado img', (err, usuario) => {
    if (err) {
      return res.status(400).json({
        OK: false,
        err
      });
    }

    res.json({
      OK: true,
      usuario
    });
  });
});

module.exports = app;
