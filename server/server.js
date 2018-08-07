require('./config/config');
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//routes
app.use(require('./routes/usuario'));

//DB connection
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true } , (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('BD online--!!');
  }
});

app.listen(process.env.PORT, ()=> {
    console.log('Server listening at port: ', process.env.PORT);
});