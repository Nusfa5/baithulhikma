const db = require('../models/db');

const Marks = {
  addMark: ({ student_email, exam_id, marks, high_mark }) => {
    return db.query(
      'INSERT INTO exam_marks (student_email, exam_id, marks, high_mark) VALUES (?, ?, ?, ?)',
      [student_email, exam_id, marks, high_mark]
    );
  },

  getStudentExamMark: (student_email, exam_id) => {
    return db.query(
      'SELECT * FROM exam_marks WHERE student_email = ? AND exam_id = ?',
      [student_email, exam_id]
    );
  },
  getStudentAllMarks: (student_email) => {
    return db.query(
      `SELECT em.*, e.name as exam_name, e.date, e.subject_id
       FROM exam_marks em
       JOIN exams e ON em.exam_id = e.id
       WHERE em.student_email = ?`,
      [student_email]
    );
  },
  
  getStudentMarks: (student_email) => {
    return db.query(
      `SELECT em.*, e.name as exam_name, e.date, e.subject_id
       FROM exam_marks em
       JOIN exams e ON em.exam_id = e.id
       WHERE em.student_email = ?`,
      [student_email]
    );
  },
  
};

module.exports = Marks;
