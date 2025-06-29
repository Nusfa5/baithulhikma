const mysql = require('mysql2/promise'); // Use promise-based connection

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Nus5308',
  database: 'education_db'
});

module.exports = db;
