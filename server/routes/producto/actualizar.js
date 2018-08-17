'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../../models/producto');
const { verificarToken, verificarAdminRole } = require('../../middlewares/auth');

app.put('/producto/:id', [verificarToken, verificarAdminRole], (req, res) => {
  let id = req.params.id;
  let usuario = req.usuario._id;

  //modificar el req.body para actualzar el usuario que actualizó
  req.body.usuario = usuario;

  //elegir cuales son los campos actualizables de lo que vienen en el req.body
  let body = _.pick(req.body, [
    'nombre',
    'calorias',
    'azucar',
    'sodio',
    'grasa',
    'carbo',
    'proteina',
    'img',
    'estado',
    'marca',
    'unidad',
    'cantidad',
    'usuario',
    'categoria'
  ]);

  Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
    if (err) {
      return res.status(400).json({
        OK: false,
        err
      });
    }
    res.json({
      UPDATED: true,
      producto: _.pick(productoDB, [
        '_id',
        'nombre',
        'calorias',
        'azucar',
        'sodio',
        'grasa',
        'carbo',
        'proteina',
        'img',
        'estado',
        'marca',
        'unidad',
        'cantidad',
        'usuario',
        'categoria'
      ])
    });
  });
});

module.exports = app;
