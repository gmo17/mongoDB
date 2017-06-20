//console.log('The server.js workss');
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');

var db;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




/*app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})*/

app.post('/albums', function(req, res) {
  db.collection('albums').save(req.body, function(err, result){
    if (err) return console.log(err)

    console.log('saved to database');
    res.redirect('/');
  })
})

app.get('/', function(req, res){
  db.collection('albums').find().toArray(function(err, result){
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {albums: result})
  })
})

/*app.post('/quotes', function(req, res) {
  console.log(req.body);
})

app.listen(3000, function() {
  console.log('listening on 3000');
})*/

MongoClient.connect('mongodb://admins:admins@ds123722.mlab.com:23722/unicorns', function(err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function(){
    console.log('listening on 3000')
  })
})
