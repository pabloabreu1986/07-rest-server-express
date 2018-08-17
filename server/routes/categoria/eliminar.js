'use-strict';

const express = require('express');
const _ = require('underscore');
const app = express();
const Categoria = require('../../models/categoria');
const { verificarToken, verificarAdminRole } = require('../../middlewares/auth');

//no elimina, cambia el estado a falso
app.delete('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {
  let id = req.params.id;

  let cambiaEstado = {
    estado: false
  };
  //comprobar si ya no fué borrado
  //verificar que no este en estado: false
  //si está false responder que no existe

  Categoria.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, categoriaBorrada) => {
    if (err) {
      return res.status(400).json({
        DELETED: false,
        err
      });
    }

    if (!categoriaBorrada) {
      return res.status(404).json({
        DELETED: false,
        err: {
          message: 'Categoría no encontrada'
        }
      });
    }

    res.json({
      DELETED: true,
      categoria: categoriaBorrada.nombre
    });
  });
});

module.exports = app;
