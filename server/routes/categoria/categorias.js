'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../../models/categoria');
const {verificarToken, verificarAdminRole} = require('../../middlewares/auth');

//obtiene solo las categorias activas (estado: true)
app.get('/categorias', verificarToken, (req, res) => {

    let desde = Number(req.query.d) || 0;
    let paginado = Number(req.query.p) || 50;
  
    Categoria.find({estado: true}, '_id nombre nivel descripcion estado img')
          .skip(desde)
          .limit(paginado)
          .exec((err, categorias) => {
  
            if (err) {
              return res.status(400).json({
                OK: false,
                err
              });
            }           
               res.json({
                OK: true,
                RANGO: `${desde} - ${desde + paginado}`,
                CANT: categorias.length,
                categorias
              });          
          });    
  });

module.exports = app;