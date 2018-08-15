'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../../models/categoria');
const {verificarToken, verificarAdminRole} = require('../../middlewares/auth');

app.post('/categoria', [verificarToken, verificarAdminRole], (req, res) => {
  
    let body = req.body;

    let categoria = new Categoria({
      nombre: body.nombre,
      usuario: req.usuario._id,
      img: body.img,   
      nivel: body.nivel,
      descripcion: body.descripcion
    });

    categoria.save((err, categoriaDB) => {

          if (err) {
            return res.status(500).json({
              OK: false,
              err
            });
          }

          if (!categoriaDB) {
            return res.status(400).json({
              OK: false,
              err
            });
          }

        res.status(201).json({
          CREATED: true,
          categoria: _.pick(categoriaDB,['_id','nombre','usuario','img', 'descripcion','nivel','estado'])
        });
    });  
});

module.exports = app;