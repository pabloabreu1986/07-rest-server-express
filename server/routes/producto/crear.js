'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../../models/producto');
const {verificarToken} = require('../../middlewares/auth');

app.post('/producto', verificarToken, (req, res) => {
  
    let body = req.body;

    let producto = new Producto({
      nombre: body.nombre,
      calorias: body.calorias,
      azucar: body.azucar,
      sodio: body.sodio,
      grasa: body.grasa,
      carbo: body.azucar,
      proteina: body.azucar,
      img: body.img,   
      estado: body.estado,
      marca: body.marca,
      unidad: body.unidad,
      cantidad: body.cantidad,
      descripcion: body.descripcion,
      usuario: req.usuario._id,
      categoria: body.categoria,
    });

    producto.save((err, productoDB) => {

          if (err) {
            return res.status(500).json({
              OK: false,
              err
            });
          }

          if (!productoDB) {
            return res.status(400).json({
              OK: false,
              err
            });
          }

        res.status(201).json({
          CREATED: true,
          producto: _.pick(productoDB, ['_id','nombre', 'calorias', 'azucar', 'sodio', 'grasa', 'carbo', 'proteina', 'img', 'estado', 'marca', 'unidad', 'cantidad', 'usuario', 'categoria'])
        });
    });  
});

module.exports = app;