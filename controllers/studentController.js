const db = require('../models/db');
const Student = require('../models/student');
;l
// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT name, email, class, subjects FROM students WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get attendance
exports.getAttendance = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT date, status FROM attendance WHERE student_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get performance
exports.getPerformance = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT subject, marks, grade FROM performance WHERE student_email = ?', [req.user.email]); // Fixed here
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get fees
exports.getFees = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT total_fees, paid_amount, due_amount FROM fees WHERE student_id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get receipts
exports.getReceipts = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT receipt_number, amount, date FROM receipts WHERE student_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get student by ID
exports.findById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.find(studentId); // Fixed method call
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await Student.getAllStudents(); // Fixed destructure
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Student report overview
exports.getStudentReports = async (req, res) => {
  try {
    const [courses] = await db.query('SELECT DISTINCT course_id FROM attendance');

    const reports = await Promise.all(
      courses.map(async ({ course_id }) => {
        const [[attendanceSummary]] = await db.query(
          `SELECT 
             COUNT(*) AS totalClasses,
             SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS presentCount
           FROM attendance
           WHERE course_id = ?`,
          [course_id]
        );

        const attendancePercent = attendanceSummary.totalClasses > 0
          ? ((attendanceSummary.presentCount / attendanceSummary.totalClasses) * 100).toFixed(1) + '%'
          : 'N/A';

        const [[averageScoreRow]] = await db.query(
          `SELECT AVG(em.marks) AS averageScore
           FROM exam_marks em
           JOIN exams e ON em.exam_id = e.exam_id
           WHERE e.subject_id = ?`, // Make sure `subject_id` exists
          [course_id]
        );

        const averageScore = averageScoreRow.averageScore !== null
          ? Math.round(averageScoreRow.averageScore)
          : 'N/A';

        return {
          class: `Course ${course_id}`,
          attendance: attendancePercent,
          averageScore
        };
      })
    );

    res.json(reports);
  } catch (err) {
    console.error('Error in /api/reports-overview:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await Student.deleteById(studentId);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, email } = req.body;
    await Student.updateById(studentId, { name, email });
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
