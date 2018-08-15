'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../../models/categoria');
const {verificarToken, verificarAdminRole} = require('../../middlewares/auth');


app.put('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;
    let usuario = req.usuario._id;

    //modificar el req.body para actualzar el usuario que actualizó
    req.body.usuario = usuario;

    //elegir cuales son los campos actualizables de lo que vienen en el req.body
    let body =  _.pick( req.body, ['nombre', 'nivel', 'usuario', 'descripcion', 'estado']);


    Categoria.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, categoriaDB) => {

        if (err) {
          return res.status(400).json({
            OK: false,
            err
          });
        }
        res.json({
          UPDATED: true,
          categoria: _.pick(categoriaDB,['_id','nombre','usuario','img', 'descripcion','nivel','estado'])
        });
    });
});

module.exports = app;