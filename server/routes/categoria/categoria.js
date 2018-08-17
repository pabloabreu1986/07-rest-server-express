'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../../models/categoria');
const { verificarToken } = require('../../middlewares/auth');

// //obtiene una categoría por ID
app.get('/categoria/:id', verificarToken, (req, res) => {
  let id = req.params.id;

  Categoria.findOne({ _id: id, estado: true }, '_id nombre descripcion nivel img', (err, categoria) => {
    if (err) {
      return res.status(400).json({
        OK: false,
        err
      });
    }
    res.json({
      OK: true,
      categoria
    });
  });
});

module.exports = app;
