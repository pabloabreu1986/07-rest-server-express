require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
 
app.get('/usuario', function (req, res) {
  res.json('GET Usuario');
})

app.post('/usuario', function (req, res) {

  let body = req.body;

  if (!req.body.nombre) {
    res.status(400).json({
      OK: false,
      Message: 'Name is required'
    });
  } else {
    res.json({usuario: body});
  }

})

app.put('/usuario', function (req, res) {
  res.json('PUT Usuario');
})

app.delete('/usuario', function (req, res) {
  res.json('DELETE Usuario');
})
 
app.listen(process.env.PORT, ()=> {
    console.log('Server listening at port: ', process.env.PORT);
})