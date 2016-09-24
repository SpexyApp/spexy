var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var auth = require('./auth');

db.initializeDB();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    auth.registerUser(username,password,function(){
      res.send("success");
    },function(error){
      var response = {
        error: error
      }
      res.send(JSON.stringify(response));
    });
});

app.listen(3000, function () {
  console.log('Spexy Server!');
});
