'use-strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {
  let tipo = req.params.tipo;
  let id = req.params.id;
  if (!req.files) {
    return res.status(400).json({
      OK: false,
      message: 'Ningún archivo fue subido..!!'
    });
  }

  // el nombre del input del archivo (i.e. "archivo") es usado para obtener el nombre del archivo
  let archivo = req.files.archivo;
  let extencion = archivo.name.split('.')[1];

  // tipos válidos
  let tiposV = ['productos', 'usuarios'];

  if (tiposV.indexOf(tipo) < 0) {
    return res.status(401).json({
      OK: false,
      error: `Tipo ${tipo} NO permitido..!!`,
      message: `Los tipos permitidos son: ${tiposV.join(', ')}`
    });
  }

  // extenciones válidas
  let extencionesV = ['gif', 'jpeg', 'jpg', 'png'];

  if (extencionesV.indexOf(extencion) < 0) {
    return res.status(401).json({
      OK: false,
      error: `Extención ${extencion} NO permitida..!!`,
      message: `Las extenciones permitidas son: ${extencionesV.join(', ')}`
    });
  }

  // mv() se usa para poner el arhcivo en algún lugar del servidor
  archivo.mv(`uploads/${tipo}/${archivo.name}`, err => {
    if (err) {
      return res.status(500).json({
        OK: false,
        err
      });
    }

    res.json({
      OK: true,
      message: `El archivo: ${archivo.name} fue subido satisfactoriamente`
    });
  });
});

module.exports = app;
