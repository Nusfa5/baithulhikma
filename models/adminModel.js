const db = require('../models/db');


const createAdminsTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS admins (
      adminId CHAR(36) PRIMARY KEY,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating admins table:", err);
    } else {
      console.log("Admins table created or already exists.");
    }
  });
};

module.exports = {
  createAdminsTable,
};
