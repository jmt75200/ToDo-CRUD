var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var toDo = new Schema({
  title : String,
  description : string,
  is_done : Boolean,
  created_at : Date
});

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'jade');

//app.get with jade
//shows end result renders all CRUD :: newly added todo list, checks is_done, updated todo, delete
app.get('/', function (req, res){
  // res.render('index', {
  //   title : title,
  //   description : description,
  //   is_done : is_done,
  //   created_at : Date
  // });
});

//reders new_todo from form page
//app.get('/new_todo', function (req, res){});

//saves new todo and redirects to index
//app.post('/todos', function (req, res){});

//updates todo and redirects to index

