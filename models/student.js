const db = require('../models/db');

const Student = {
  // Create a new student
  create: ({ id, name, email, password }) => {
    return db.query(
      'INSERT INTO students (id, name, email, password) VALUES (?, ?, ?, ?)',
      [id, name, email, password]
    );
  },

  // Find student by ID
  findById: (id) => {
    return db.query('SELECT * FROM students WHERE id = ?', [id]);
  },



  // Update student by email
  updateById: (id, updatedData) => {
    const { name, email } = updatedData;
    return db.query(
      'UPDATE students SET name = ?,  email = ? WHERE id = ?',
      [name,email, id]
    );
  },

  // Delete student by ID
  deleteById: (id) => {
    return db.query('DELETE FROM students WHERE id = ?', [id]);
  },
  
  getAllStudents: () => {
    return db.query('SELECT  s.name, s.email, s.password FROM students s');
  },
};

module.exports = Student;
