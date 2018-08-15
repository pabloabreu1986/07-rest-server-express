'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../../models/producto');
const {verificarToken} = require('../../middlewares/auth');


//obtiene un producto por ID
app.get('/producto/:id', verificarToken, (req, res) => {

    let id = req.params.id;

  Producto.findOne({_id: id, estado: true}, '_id nombre calorias azucar sodio grasa carbo proteina img estado marca unidad cantidad usuario categoria', (err, producto) => {

    if (err) {

        return res.status(400).json({
          OK: false,
          err
        });
    };

      res.json({
        OK: true,
        producto
      });

  });    
});
  
module.exports = app;