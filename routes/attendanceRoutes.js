const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const Attendance = require('../models/attendence'); 

router.post('/mark', attendanceController.markAttendance);
router.get('/student', attendanceController.getStudentAttendance);
router.get('/summary', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Missing student email' });
  }

  try {
    const [rows] = await Attendance.getAttendanceSummary(email);
    const summary = rows[0];
    const percentage = summary.totalClasses > 0
      ? ((summary.attended / summary.totalClasses) * 100).toFixed(2)
      : 0;

    res.json({
      totalClasses: summary.totalClasses,
      attended: summary.attended,
      percentage,
    });
  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
