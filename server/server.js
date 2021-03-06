'use-strict';

require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//configurar public
app.use(express.static(path.resolve(__dirname, '../public')));

//configuración global de rutas
app.use(require('./routes/index'));

//DB connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log('BD online--!!');
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log('Server listening at port: ', process.env.PORT);
});
