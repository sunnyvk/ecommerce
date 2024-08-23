const express = require("express");
const config = require("config");
const mysql = require("mysql2");
const { request } = require("http");
const { error } = require("console");
const appForUsers = express.Router();

var connection = mysql.createConnection({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});



appForUsers.post("/login", (request, response) => {
  var query = `select *  from users where email="${request.body.email}" and password="${request.body.password}"`
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

appForUsers.post("/cust", (request, response) => {
  var query = `select  first_name, last_name, email, id, mobile , role , status from users  where role ="CUSTOMER"`
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

appForUsers.get("/get", (request, response) => {
    var query = `select  first_name, last_name, email, id, mobile , role , status from users where status = "APPROVED" and role="SELLER"`
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
appForUsers.get("/cust", (request, response) => {
  var query = `select  first_name, last_name, email, id, mobile , role , status from users where role = "CUSTOMER"`
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

appForUsers.get("/pending", (request, response) => {
  var query = `select  first_name, last_name, email, id, mobile , role , status from users where status = "PENDING" and role="SELLER"`
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


appForUsers.get("/get/:role/:status", (request, response) => {
var query = `select  first_name, last_name, email, id, mobile , role , status from users  where role ="${request.params.role}" AND status ="${request.params.status} " `
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
  appForUsers.get("/get/cust", (request, response) => {
    var query = `select  first_name, last_name, email, id, mobile , role , status from users  where role ="CUSTOMER" `
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



appForUsers.put("/approved/:id", (request, response) => {
  var query = `update users set status="APPROVED" where status ="PENDING" and id = ${request.params.id}`;
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

appForUsers.put("/remove/:id", (request, response) => {
  var query = `update users set status="REMOVE" where status ="APPROVED" and id = ${request.params.id}`;
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




appForUsers.delete("/delete/:id", (request, response) => {
  var query = `delete from users where id=${request.params.id}`;
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

module.exports = appForUsers;
