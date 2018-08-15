'use-strict';

const express = require('express');
const app = express();

//usuario
app.use(require('./usuario/usuarios'));
app.use(require('./usuario/crear'));
app.use(require('./usuario/actualizar'));
app.use(require('./usuario/eliminar'));
app.use(require('./usuario/usuario'));

//categoría
app.use(require('./categoria/categorias'));
app.use(require('./categoria/crear'));
app.use(require('./categoria/actualizar'));
app.use(require('./categoria/eliminar'));
app.use(require('./categoria/categoria'));

//login
app.use(require('./login/login'));


module.exports = app;