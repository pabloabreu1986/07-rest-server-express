'use-strict';

const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');


//login route
app.post('/login', (req, res) =>{

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
              OK: false,
              err
            });
          } 

          if (!usuarioDB) {
            return res.status(404).json({
                OK: false,
                email: body.email+'hola',
                message: '(Usuario) o password no válido'
              });              
          }

          if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(404).json({
                OK: false,
                message: 'Usuario o (password) no válido'
              });              
          }

          let token = jwt.sign({
              usuario: usuarioDB
          }, process.env.SEED, {expiresIn: process.env.CAD_TOKEN});

          res.json({
            OK: true,
            usuario: _.pick(usuarioDB,['_id','nombre', 'email','img','role','estado','google']),
            token
        });
    });
});






module.exports = app;