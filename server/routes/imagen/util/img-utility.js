'use-strict';

const Usuario = require('../../../models/usuario');
const Producto = require('../../../models/producto');
const fs = require('fs');
const path = require('path');

let imagenUsuario = (id, res, nombreArchivo) => {
  Usuario.findById(id, (err, usuarioDB) => {
    if (err) {
      borrarArchivo(nombreArchivo, 'usuarios');
      return res.status(500).json({
        OK: false,
        err
      });
    }
    if (!usuarioDB) {
      borrarArchivo(nombreArchivo, 'usuarios');
      return res.json({
        OK: false,
        MESSAGE: 'El usuario no existe en la base de datos'
      });
    }
    borrarArchivo(usuarioDB.img, 'usuarios');
    usuarioDB.img = nombreArchivo;
    usuarioDB.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(500).json({
          OK: false,
          err
        });
      }
      return res.json({
        OK: true,
        USUARIO: usuarioGuardado
      });
    });
  });
};

let imagenProducto = (id, res, nombreArchivo) => {
  Producto.findById(id, (err, productoDB) => {
    if (err) {
      borrarArchivo(nombreArchivo, 'productos');
      return res.status(500).json({
        OK: false,
        err
      });
    }
    if (!productoDB) {
      borrarArchivo(nombreArchivo, 'productos');
      return res.status(500).json({
        OK: false,
        err: 'El producto no existe en la BD'
      });
    }
    borrarArchivo(productoDB.img, 'productos');
    productoDB.img = nombreArchivo;
    productoDB.save((err, productoGuardado) => {
      if (err) {
        return res.status(500).json({
          OK: false,
          err
        });
      }
      return res.json({
        OK: true,
        PRODUCTO: productoGuardado
      });
    });
  });
};

let borrarArchivo = (nombreArchivo, tipo) => {
  let pathImg = path.resolve(__dirname, `../../../../uploads/${tipo}/${nombreArchivo}`);
  if (fs.existsSync(pathImg)) {
    fs.unlinkSync(pathImg);
  }
};

module.exports = {
  imagenProducto,
  imagenUsuario
};
