'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Usuario = require('../../models/usuario');
const {verificarToken, verificarAdminRole} = require('../../middlewares/auth');


app.put('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id;

    //elegir cuales son los campos válidos de lo que vienen en el req.body
    let body =  _.pick( req.body, ['nombre', 'email','img','role','estado']);   

    Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, usuarioDB) => {

        if (err) {
          return res.status(400).json({
            OK: false,
            err
          });
        }
      let newU = _.pick(usuarioDB,['_id','nombre', 'email','img','role','estado','google']);
        res.json({
          UPDATED: true,
          usuario: newU
        });
    });
});

module.exports = app;