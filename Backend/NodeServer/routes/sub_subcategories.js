const express = require("express");
const config = require("config");
const mysql = require("mysql");
const { request } = require("http");
const { error } = require("console");
const appForSub_Subcategories = express.Router();

var connection = mysql.createConnection({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});


appForSub_Subcategories.post("/add", (request, response) => {
  var query = `insert   into  sub_sub_categories (name, sub_category_id) values('${request.body.name}', ${request.body.sub_category_id})`;
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


appForSub_Subcategories.get("/get", (request, response) => {
  connection.query("select * from sub_sub_categories", (error, result) => {
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

appForSub_Subcategories.get("/get/:name", (request, response) => {
var query = `select name,id from sub_sub_categories where sub_category_id= (select id from  sub_categories where name = "${request.params.name}")`
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



appForSub_Subcategories.put("/update/:id", (request, response) => {
  var query = `update sub_sub_categories set name="${request.body.name}",sub_category_id="${request.body.sub_category_id}"where id="${request.params.id}"`;
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




appForSub_Subcategories.delete("/delete/:id", (request, response) => {
  var query = `delete from sub_sub_categories where id=${request.params.id}`;
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

module.exports = appForSub_Subcategories;
