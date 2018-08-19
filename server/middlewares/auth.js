'use-strict';

const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

/**************************
 *     VERIFICAR_TOKEN      *
 **************************/
let verificarToken = (req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        OK: false,
        err: {
          message: 'El token no es válido',
          err
        }
      });
    }
    //al relizar la validación se modifica el req y se le agrega el usuario
    req.usuario = decoded.usuario;
    next();
  });
};

/**************************
 *   VERIFICAR_ADMIN_ROLE   *
 **************************/
let verificarAdminRole = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role === 'ADMIN_ROLE') {
    next();
  } else {
    return res.status(401).json({
      OK: false,
      err: {
        message: 'El USUARIO NO TIENE PRIVILEGIOS'
      }
    });
  }
};

/**************************
 *  VERIFICAR_TOKEN_URL    *
 **************************/
let verificarTokenUrl = (req, res, next) => {
  let token = req.query.token;

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        OK: false,
        err: {
          message: 'El token no es válido',
          err
        }
      });
    }

    //al relizar la validación se modifica el req y se le agrega el usuario
    req.usuario = decoded.usuario;
    next();
  });
};

module.exports = {
  verificarToken,
  verificarAdminRole,
  verificarTokenUrl
};
