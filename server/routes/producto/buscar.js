'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../../models/producto');
const { verificarToken } = require('../../middlewares/auth');

//obtiene un producto por un termino
app.get('/producto/buscar/:termino', verificarToken, (req, res) => {
  let termino = req.params.termino;
  let regexp = new RegExp(termino, 'i');

  Producto.find(
    { nombre: regexp, estado: true },
    '_id nombre calorias azucar sodio grasa carbo proteina img estado marca unidad cantidad usuario categoria'
  )
    .populate('categoria', 'nombre')
    .populate('usuario', 'nombre')
    .exec((err, productos) => {
      if (err) {
        return res.status(400).json({
          OK: false,
          err
        });
      }

      res.json({
        OK: true,
        CANTIDAD: productos.length,
        productos
      });
    });
});

module.exports = app;
