const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario');


//login route
app.post('/login', (req, res) =>{

    res.json({
        OK: true,
        message: 'login endpoint' 
    });

});






module.exports = app;