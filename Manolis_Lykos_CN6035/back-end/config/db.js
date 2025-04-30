const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "192.168.2.2",
    user: "root",
    password: "1234",
    database: "hippo_db",
  })
  .promise();

module.exports = pool;
