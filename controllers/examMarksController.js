const ExamMarks = require('../models/examMarks');

exports.addMark = async (req, res) => {
  try {
    const { student_email, exam_id, marks, high_mark } = req.body;
    await ExamMarks.addMark({ student_email, exam_id, marks, high_mark });
    res.status(201).json({ message: 'Marks added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding marks', error });
  }
};

exports.getStudentMarks = async (req, res) => {
  try {
    const { student_email } = req.query;
    const [rows] = await ExamMarks.getStudentMarks(student_email);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching marks', error });
  }
};

exports.getStudentExamMark = async (req, res) => {
  try {
    const { student_email, exam_id } = req.query;
    const [rows] = await ExamMarks.getStudentExamMark(student_email, exam_id);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam mark', error });
  }
  
};
