'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../../models/producto');
const {verificarToken} = require('../../middlewares/auth');

//obtiene solo los productos activos (estado: true)
app.get('/productos', verificarToken, (req, res) => {

    let desde = Number(req.query.d) || 0;
    let paginado = Number(req.query.p) || 50;
  
    Producto.find({estado: true}, '_id nombre calorias azucar sodio grasa carbo proteina img estado marca unidad cantidad usuario categoria')
          .skip(desde)
          .limit(paginado)
          .sort('nombre')//ordenar por un campo(nombre)
          .populate('usuario', 'nombre email')//adicionar los datos del usuario(nombre y email)
          .populate('categoria', 'nombre descripcion')
          .exec((err, productos) => {
  
            if (err) {
              return res.status(400).json({
                OK: false,
                err
              });
            }           
               res.json({
                OK: true,
                RANGO: `${desde} - ${desde + paginado}`,
                CANT: productos.length,
                productos
              });          
          });    
  });

module.exports = app;