const db = require('../models/db');

const SubjectModel = {
    // Create a subject
    createSubject: ({ subject_id, subject_name, tutor_id, fees }) => {
        return db.query(
            'INSERT INTO subject (subject_id, subject_name, tutor_id, fees) VALUES (?, ?, ?, ?)',
            [subject_id, subject_name, tutor_id, fees]
        );
    },

    // Get all subjects
    getAllSubjects: () => {
        return db.query('SELECT * FROM subject');
    },

    // Get all subjects taught by a specific tutor
    getTutorSubjects: (tutor_id) => {
        return db.query(
            'SELECT * FROM subject WHERE tutor_id = ?',
            [tutor_id]
        );
    },

    // Get one subject by subject_id
    getSubject: (subject_id) => {
        return db.query(
            'SELECT * FROM subject WHERE subject_id = ?',
            [subject_id]
        );
    },

    // Get tutor name and fees for a subject by subject_name
    getTutorDetailsForSubject: (subject_name) => {
        return db.query(
            `SELECT s.subject_id, s.subject_name, s.fees, t.tutor_name 
             FROM subject s
             INNER JOIN tutor t ON s.tutor_id = t.tutor_id 
             WHERE s.subject_name = ?`,
            [subject_name]
        );
    },
};

module.exports = SubjectModel;
