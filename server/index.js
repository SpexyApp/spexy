/*
* index.js
*
* Spexy Backend Server Main File
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var auth = require('./auth');
var config = require('./config');

db.initializeDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);
var cookieSession = require('cookie-session');
var path = require('path').dirname(require.main.filename);

app.use(cookieSession({
  name: 'session',
  keys: config.keys
}));

app.get('/', function (req, res) {
  if(req.session.user != null)
  {
    res.send("signed in: " + req.session.user);
  }
  else
  {
    var path = require('path').dirname(require.main.filename);
    res.sendFile(path + "/testform.html");
  }
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

app.post('/pcauth', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var mac = req.body.mac;
  var title = req.body.title;
  auth.authenticateComputer(username,password,title,mac,function(msg){
    res.send(msg);
  });
});

app.post('/auth', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  auth.loginUser(username,password,req,function(msg){
    res.send(msg);
  });
});

app.get('/signout', function(req, res) {
  req.session.user = null;
  res.redirect('/');
});

app.listen(1337, function () {
  console.log('Spexy Server!');
});
