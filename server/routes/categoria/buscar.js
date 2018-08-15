'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../../models/categoria');
const {verificarToken} = require('../../middlewares/auth');


//obtiene un producto por un termino
app.get('/categoria/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;
    let regexp = new RegExp(termino, 'i');

    Categoria.find({nombre: regexp, estado: true}, '_id nombre usuario descripcion nivel img')
          .populate('usuario', 'nombre')
          .exec( (err, categorias) => {

            if (err) {
                return res.status(400).json({
                  OK: false,
                  err
                });
            };

            res.json({
              OK: true,
              CANTIDAD: categorias.length,
              categorias
            });
          });    
});
  
module.exports = app;