'use-strict';

const express = require('express');
const app = express();

//usuario
app.use(require('./usuario/usuarios'));
app.use(require('./usuario/crear'));
app.use(require('./usuario/actualizar'));
app.use(require('./usuario/eliminar'));
app.use(require('./usuario/usuario'));

//login
app.use(require('./login/login'));


module.exports = app;