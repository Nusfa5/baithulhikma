const db = require('../models/db');

const Tutor = {
    // Insert a tutor
    createTutor: ({ tutor_id, tutor_name, email, password }) => {
        return db.query(
            'INSERT INTO tutor (tutor_id, tutor_name, email, password) VALUES (?, ?, ?, ?)',
            [tutor_id, tutor_name, email, password]
        );
    },

    // Get all tutors
    getAllTutors: () => {
        return db.query('SELECT * FROM tutor');
    },

     getAllTutorsBySubjects: () => {
    return db.query(`
      SELECT t.tutor_id, t.tutor_name, t.email, s.subject_name
      FROM tutor t
      LEFT JOIN subject s ON t.tutor_id = s.tutor_id
    `);
  },
   
    getTutor: (tutor_id) => {
        return db.query(
            'SELECT * FROM tutor WHERE tutor_id = ?',
            [tutor_id]
        );
    }
};

module.exports = Tutor;
