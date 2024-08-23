const express = require("express");
const config = require("config");
const mysql = require("mysql");
const { request } = require("http");
const { error } = require("console");
const appForcategories = express.Router();

var connection = mysql.createConnection({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});


appForcategories.post("/add", (request, response) => {
  var query = `insert   into  categories (name) values('${request.body.name}')`;
  connection.query(query, (error, result) => {
    if (error == null) {
      var data = JSON.stringify(result);
      response.setHeader("Content-Type", "application/json");
      response.send(data);
    } else {
      response.setHeader("Content-Type", "application/json");
      response.send(error);
    }
  });
});


appForcategories.get("/get", (request, response) => {
  connection.query("select * from categories", (error, result) => {
    if (error == null) {
      var data = JSON.stringify(result);
      response.setHeader("Content-Type", "application/json");
      response.send(data);
    } else {
      response.setHeader("Content-Type", "application/json");
      response.send(error);
    }
  });
});

appForcategories.put("/update/:id", (request, response) => {
  var query = `update categories set name="${request.body.name}"where id="${request.params.id}"`;
  connection.query(query, (error, result) => {
    if (error == null) {
      var data = JSON.stringify(result);
      response.setHeader("Content-Type", "application/json");
      response.send(data);
    } else {
      response.setHeader("Content-Type", "application/json");
      response.send(error);
    }
  });
});




appForcategories.delete("/delete/:id", (request, response) => {
  var query = `delete from categories where id=${request.params.id}`;
  connection.query(query, (error, result) => {
    if (error == null) {
      var data = JSON.stringify(result);
      response.setHeader("Content-Type", "application/json");
      response.send(data);
    } else {
      response.setHeader("Content-Type", "application/json");
      response.send(error);
    }
  });
});

module.exports = appForcategories;
