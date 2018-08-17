'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../../models/producto');
const { verificarToken, verificarAdminRole } = require('../../middlewares/auth');

//no elimina, cambia el estado a falso
app.delete('/producto/:id', [verificarToken, verificarAdminRole], (req, res) => {
  let id = req.params.id;

  let cambiaEstado = {
    estado: false
  };

  Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoBorrada) => {
    if (err) {
      return res.status(400).json({
        DELETED: false,
        err
      });
    }

    if (!productoBorrada) {
      return res.status(404).json({
        DELETED: false,
        err: {
          message: 'Producto no encontrado'
        }
      });
    }

    res.json({
      DELETED: true,
      producto: productoBorrada.nombre
    });
  });
});

module.exports = app;
