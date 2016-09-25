//database handler

var mysql = require('mysql');
var config = require('./config');

module.exports.initializeDB = initializeDB;
module.exports.checkExists = checkExists;
module.exports.insert = insert;
module.exports.where = where;
module.exports.selectAll = selectAll;

var connection;

function initializeDB()
{
  console.log(JSON.stringify(config));
  connection = mysql.createConnection(config.db_config);

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
    console.log(JSON.stringify(rows));
    if(rows.length > 0)
    {
      console.log("exists");
      existsCallback();
    }
    else
    {
      console.log("success");
      successCallback();
    }
  });
}

function insert(table,data,successCallback,failCallback)
{
  connection.query('INSERT INTO ' + table + ' SET ?', data, function(error, result) {
    if(error) {
      console.log(error);
      console.log("error");
      failCallback();
    }
    else successCallback();
  });
}

function replace(table,data,successCallback,failCallback)
{
  connection.query('REPLACE INTO ' + table + ' SET ?', data, function(error, result) {
    if(error) {
      console.log(error);
      failCallback();
    }
    else successCallback();
  });
}

function where(table,key,value,resultCallback)
{
  var queryString = "SELECT * FROM " + table + " WHERE " + key + " = " + connection.escape(value);
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    if(rows.length > 0)
    {
      resultCallback(rows);
    }
    else
    {
      resultCallback(null);
    }
  });

}

function selectAll(table,resultCallback)
{
  var queryString = "SELECT * FROM " + table;
  connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    if(rows.length > 0)
    {
      resultCallback(rows);
    }
    else
    {
      resultCallback(null);
    }
  });
}
