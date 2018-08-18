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
app.use(require('./categoria/buscar'));

//producto
app.use(require('./producto/productos'));
app.use(require('./producto/crear'));
app.use(require('./producto/actualizar'));
app.use(require('./producto/eliminar'));
app.use(require('./producto/producto'));
app.use(require('./producto/buscar'));

//login
app.use(require('./login/login'));

//files
app.use(require('./imagen/upload'));
app.use(require('./imagen/imagen'));

module.exports = app;
