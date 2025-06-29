const db = require('../models/db');

exports.getAssignedClasses = async (req, res) => {
  try {
    // Get classes where this tutor is assigned
    const [rows] = await db.execute('SELECT id, class_name, subject FROM classes WHERE tutor_id = ?', [req.user.id]);
    res.json(rows);       // Send the class list
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentsInClass = async (req, res) => {
  try {
    const classId = req.params.classId;    // Get class ID from URL
    const [rows] = await db.execute('SELECT id, name, email FROM students WHERE class_id = ?', [classId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getClassAttendance = async (req, res) => {
  try {
    const classId = req.params.classId;

      // Join attendance table with student table to get names
    const [rows] = await db.execute(`
      SELECT s.name, a.date, a.status
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      WHERE s.class_id = ?
    `, [classId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getClassPerformance = async (req, res) => {
  try {
    const classId = req.params.classId;
    // Join performance table with students to get names
    const [rows] = await db.execute(`
      SELECT s.name, p.subject, p.marks, p.grade
      FROM performance p
      JOIN students s ON p.student_id = s.id
      WHERE s.class_id = ?
    `, [classId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.giveFeedback = async (req, res) => {
  try {
    const { studentId, feedback } = req.body; 
    
    // Insert feedback with student ID and tutor ID
    await db.execute('INSERT INTO feedback (student_id, tutor_id, feedback) VALUES (?, ?, ?)', [studentId, req.user.id, feedback]);
    res.json({ message: 'Feedback sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendAnnouncement = async (req, res) => {
  try {
    const { classId, announcement } = req.body;
    await db.execute('INSERT INTO announcements (class_id, tutor_id, announcement) VALUES (?, ?, ?)', [classId, req.user.id, announcement]);
    res.json({ message: 'Announcement sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports. getAllTutorsBySubjects = async (req, res) => {
// Get all tutors and their subjects
  try {
    const [rows] = await db.execute(`
      SELECT t.tutor_id, t.tutor_name, t.email, s.subject_name
      FROM tutor t
      LEFT JOIN subject s ON t.tutor_id = s.tutor_id
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
