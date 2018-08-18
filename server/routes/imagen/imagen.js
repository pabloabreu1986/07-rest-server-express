'use-strict';

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/imagen/:tipo/:img', (req, res) => {
  let tipo = req.params.tipo;
  let img = req.params.img;
  let pathImage = path.resolve(__dirname, `../../../uploads/${tipo}/${img}`);

  if (fs.existsSync(pathImage)) {
    return res.sendFile(pathImage);
  } else {
    let pathNoImage = path.resolve(__dirname, '../../assets/no-found.jpeg');
    return res.sendFile(pathNoImage);
  }
});

module.exports = app;
