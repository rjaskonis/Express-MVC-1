"use strict";

var db 		 = {};
var fs       = require("fs");
var path     = require("path");
var env      = process.env.NODE_ENV || "development";

db.Sequelize = require('sequelize');
//db.sequelize = new db.Sequelize('dev1', 'sa', 'Uxrj12', { host: "172.16.100.102", dialect: "mssql", port: "1433",  timezone: "-02:00" });
db.sequelize = new db.Sequelize('dev1', 'sa', '***', { host: "127.0.0.1", dialect: "mssql", port: "1433",  timezone: "-02:00" });

// add all models to context (folder)
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = db.sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Object.keys(db).forEach(function(modelName) {
// 	console.log(modelName);
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

module.exports = db;
