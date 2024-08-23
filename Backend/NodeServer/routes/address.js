const express = require("express");
const config = require("config");
const mysql = require("mysql");
const { request } = require("http");
const { error } = require("console");
const appForAddress = express.Router();

var connection = mysql.createConnection({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});


appForAddress.post("/add", (request, response) => {
  var query = `insert into available_addresses values(${request.body.pincode},'${request.body.city}')`;
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

appForAddress.get("/get", (request, response) => {
  connection.query("select * from available_addresses", (error, result) => {
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

appForAddress.put("/update/:pincode", (request, response) => {
  var query = `update available_addresses set city="${request.body.city}"where pincode="${request.params.pincode}"`;
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

appForAddress.put("/update/:city", (request, response) => {
  var query = `update available_addresses set pincode=${request.body.pincode} where city="${request.params.city}"`;
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


appForAddress.delete("/delete/:pincode", (request, response) => {
  var query = `delete from available_addresses where pincode=${request.params.pincode}`;
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

module.exports = appForAddress;
