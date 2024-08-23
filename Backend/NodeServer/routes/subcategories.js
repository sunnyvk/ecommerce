const express = require("express");
const config = require("config");
const mysql = require("mysql");
const { request } = require("http");
const { error } = require("console");
const appForSubcategories = express.Router();

var connection = mysql.createConnection({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});


appForSubcategories.post("/add", (request, response) => {
  var query = `insert   into  sub_categories (name, category_id) values('${request.body.name}', ${request.body.categoryid})`;
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


appForSubcategories.get("/get", (request, response) => {
  connection.query("select * from sub_categories", (error, result) => {
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

appForSubcategories.get("/get/:name", (request, response) => {
var query = `select name,id from sub_categories where category_id= (select id from categories where name = "${request.params.name}")`
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



appForSubcategories.put("/update/:id", (request, response) => {
  var query = `update sub_categories set name="${request.body.name}", category_id="${request.body.category_id}"where id="${request.params.id}"`;
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




appForSubcategories.delete("/delete/:id", (request, response) => {
  var query = `delete from sub_categories where id=${request.params.id}`;
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

module.exports = appForSubcategories;
