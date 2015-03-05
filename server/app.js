var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var toDo = new Schema({
  title : String,
  description : String,
  is_done : {type: Boolean, default: false},
  created_at : {type: Date, default: Date.now}
});

var Todo = mongoose.model('Todo', toDo);

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.set('view engine', 'jade');

//app.get with jade
//shows end result renders all CRUD :: newly added todo list, checks is_done, updated todo, delete
app.get('/', function (req, res){
  // res.send('Hello Clarice');
  Todo.find({}).sort({'created_at': -1}).exec(function (err, todos){
    if (err) throw err;
    res.render('todos/list', {todos : todos});
  });
});

/*var complete_count = 0, incomplete_count = 0;

  Todo.find({}).count({is_done: true}, function (err, complete_count){
    Todo.count({is_done: false},function (err, incomplete_count){
      if(err) throw err;
      res.render('layouts/layout', {
        todos : todos,
        complete_count : is_complete,
        incomplete_count : is_incomplete
      });
    });
  });*/

//reders new_todo from form page
app.get('/new', function (req, res){
  res.render('todos/new');

});

//reders new_todo from form page
app.get('/todos/:id/edit', function (req, res){
  Todo.find({ _id : req.params.id }, function (err, todos){
    if (err) throw err;
    console.log(todos);
    res.render('todos/edit', {todos : todos[0]});
  });
  

});

//saves new todo and redirects to index
app.post('/todos', function (req, res){
  var title = req.body.title;
  var description = req.body.description;

  var todo = new Todo(
    {
      title : title,
      description : description
    }
  );

  todo.save(function (err){
    if (err) throw err;
    res.redirect("/");
  });

});

//update todos with edit
//renders an edit todo form page
app.put("/todos/:id", function (req, res){
  Todo.update({_id : req.params.id}, {
    title : req.body.title,
    description : req.body.description
  }, function (err){
    if (err) throw err;
    res.redirect("/");
  });
});

//updates todo and redirects to index
//to checks the todo complete
app.put('/todos/:id/complete', function (req, res){
  // var id = req.params.id;
  // console.log('complete', id);
  // var completed = req.body.is_done || "";
  
  Todo.update({_id : req.params.id}, { $set: { is_done : true } }, function (err, todo){
      if (err) throw err;
      res.send('todo is complete');
  });
});

//updates todo and redirects to index
//to checks the todo uncomplete
app.put('/todos/:id/incomplete', function (req, res){
  // var id = req.params.id;
  // console.log('uncomplete', id);
  // var uncomplete = req.body.is_done || "";
  
  Todo.update({_id : req.params.id}, { $set: { is_done : false } }, function (err, todo){
    if (err) throw err;
    res.send('todo is incomplete');
  });
});

//destroy todo item redirects to index
//linked to jade file that renders x button
app.delete('/todos/:id', function (req, res){
  // var id = req.params.id;
  //find id then remove then redirect
  Todo.find({_id : req.params.id}).remove().exec(function (err){
    //redirect to index once item is removed
    if (err) throw err;
    res.redirect("/");
  });
});

//local server stuff
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});