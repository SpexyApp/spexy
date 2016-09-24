//database handler

var mysql = require('mysql');
var dbconf = require('./dbconf');

module.exports.initializeDB = initializeDB;
module.exports.checkExists = checkExists;
module.exports.insert = insert;

var connection;

function initializeDB()
{
  console.log(JSON.stringify(dbconf));
  connection = mysql.createConnection(dbconf.db_config);

  setInterval(function () {
    connection.query('SELECT 1');
  }, 5000);

  console.log("initializeDB");
}

function checkExists(table,key,value,successCallback,existsCallback)
{
  var queryString = "SELECT * FROM " + table + " WHERE " + key + " = " + connection.escape(value);
  console.log(queryString);
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    if(rows > 0)
    {
      existsCallback();
    }
    else
    {
      successCallback();
    }
  });
}

function insert(table,data,successCallback,failCallback)
{
  connection.query('INSERT INTO ' + table + ' SET ?', data, function(error, result) {
    if(error) {
      console.log(error);
      failCallback();
    }
    else successCallback();
  });
}
