const db = require('../models/db');

const Subject_StudentModel = {
    
    
    createSubjectStudent: ({ student_email, subject_id }) => {
        return db.query(
            'INSERT INTO subject_student (student_email, subject_id) VALUES (?, ?)',
            [student_email, subject_id]
        );
    },

    
    getAllSubjectStudents: () => {
        return db.query('SELECT * FROM subject_student');
    },


    getStudentSubjects: (student_email) => {
        return db.query(
            'SELECT * FROM subject_student WHERE student_email = ?',
            [student_email]
        );
    },

    getSubjectStudent: (student_email, subject_id) => {
        return db.query(
            'SELECT * FROM subject_student WHERE student_email = ? AND subject_id = ?',
            [student_email, subject_id]
        );
    },

    
    findTimetableByEmail: (email) => {
        return db.query(
            `SELECT s.subject_name, s.time, t.tutor_name 
             FROM subject s
             INNER JOIN subject_student ss ON s.subject_id = ss.subject_id
             INNER JOIN tutor t ON s.tutor_id = t.tutor_id
             WHERE ss.student_email = ?`,
            [email]
        );
    },
};

module.exports = Subject_StudentModel;
