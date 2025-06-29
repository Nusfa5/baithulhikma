const Attendance = require('../models/attendence');

// Controller to mark attendance
exports.markAttendance = async (req, res) => {
  try {
    await Attendance.markAttendance(req.body);
    res.status(201).json({ message: 'Attendance recorded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording attendance.', error });
  }
};

//  Controller to get student attendance by date range
exports.getStudentAttendance = async (req, res) => {
  const { student_email, from, to } = req.query;
  if (!student_email || !from || !to) {
    return res.status(400).json({ message: 'Missing parameters' });
  }
  try {
    const [rows] = await Attendance.getStudentAttendance(student_email, from, to);
    res.json({ attendance: rows }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance.', error });
  }
};

//  Controller to get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const [rows] = await Attendance.getAllAttendance();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance.', error });
  }
};
