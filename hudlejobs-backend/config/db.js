const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "shubham",
  database: "hudlejobdb",
};

const db = mysql.createConnection(config);

module.exports = db;
