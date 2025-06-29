// backend/repositories/tutorRepository.js

const db = require('../models/db'); // your database connection

const findAllTutors = async () => {
  const [rows] = await db.execute('SELECT name, email, course FROM tutors');
  return rows;
};

module.exports = {
  findAllTutors
};
