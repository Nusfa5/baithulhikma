const db = require('./db');

const Attendance = {
 markAttendance: ({ student_id, student_email, tutor_id, course_id, date, status, remarks }) => {
  return db.query(
    'INSERT INTO attendance (student_id, student_email, tutor_id, course_id, date, status, remarks) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [student_id, student_email, tutor_id, course_id, date, status, remarks]
  );
},


  getStudentAttendance: (student_email, fromDate, toDate) => {
    return db.query(
      'SELECT * FROM attendance WHERE student_email = ? AND date BETWEEN ? AND ? ORDER BY date ASC',
      [student_email, fromDate, toDate]
    );
  },
  
  getAllAttendance: () => {
    return db.query('SELECT * FROM attendance');
  },
  
  getAttendanceSummary: (student_email) => {
    return db.query(
      `SELECT 
        COUNT(*) AS totalClasses,
        SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS attended
      FROM attendance
      WHERE student_email = ?`,
      [student_email]
    );
  },
};


module.exports = Attendance;
