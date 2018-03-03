var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pug = require('pug');
var passport = require('passport');
var mongoose = require('mongoose');
const expressValidator = require('express-validator');

var routes = require('./api/routes');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressValidator());
app.use('/node-modules', express.static(__dirname + '/node-modules'));
//app.use('/node-modules', express.static(__dirname + '/api'));

app.use('/api', routes); // so in this way , you mark than next routes will be  with '/api' part:  /api/register and so on...
// as you remember the order of middleware matters! so when you wrote bodyParser after /api route it wont work :) we initialize middleware at the begining of application, then routes :) papapa


//connect to the database
mongoose.connect('mongodb://Ogamiq:kzwPower123@ds046677.mlab.com:46677/kzwdb');
mongoose.connection.once('open', function() {
  console.log('Database connected1');
}).on('error', function(error) {
  console.log('Connection error:', error);
});



app.listen(3000,function(){
    console.log("Server started on 3000");
});
