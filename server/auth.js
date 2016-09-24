//user and computer authentication

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.authenticateComputer = authenticateComputer;

var db = require('./db');
var pw = require('password-hash');

//registers a user through the web interface
function registerUser(username,password,successCallback,failCallback)
{
  db.checkExists('users','username',username,function(){
    //does not exist
    var userInfo = {
      username: username,
      password: pw.generate(password)
    };
    console.log(JSON.stringify(userInfo));

    db.insert("users",userInfo,function(){
      successCallback();
    },function(){
      failCallback("An internal error occured. Try again later.");
    });
  },function(){
    //exists
    failCallback("Username already exists.");
  });

}

//logs a user into the web interface with a session token
function loginUser(username,password,successCallback,failCallback)
{

}

//authenticates a computer and returns a computer token
function authenticateComputer(username,password,title,mac,successCallback,failCallback)
{

}
