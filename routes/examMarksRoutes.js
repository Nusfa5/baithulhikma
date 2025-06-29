const express = require('express');
const router = express.Router();
const examMarksController = require('../controllers/examMarksController');
const Student = require('../models/student');
const Marks = require('../models/examMarks');

router.post('/add', examMarksController.addMark);
router.get('/student', examMarksController.getStudentMarks);
router.get('/student/exam', examMarksController.getStudentExamMark);
function getStatus(marks) {
  if (marks.length < 2) return 'Needs Attention';

  const recent = marks[marks.length - 1].marks;
  const previous = marks[marks.length - 2].marks;

  if (recent > previous) return 'Improving';
  if (recent < previous) return 'Falling Behind';
  return 'Needs Attention';
}

// Main route to get student progress
router.get('/view', async (req, res) => {
  try {
    // ✅ FIX: Only use the actual rows (ignore metadata)
    const [students] = await Student.getAllStudents(); 

    const result = [];

    for (let student of students) {
      const name = student.name || 'Unknown';
      const email = student.email;

      // ✅ FIX: Also destructure only rows if needed
      const [marksData] = await Marks.getStudentAllMarks(email);
    console.log('Marks data:', marksData);
      // Sort by date
      const sortedMarks = marksData.sort((a, b) => new Date(a.date) - new Date(b.date));
      const status = getStatus(sortedMarks);

      result.push({
        name,
        status,
        marks: sortedMarks
      });
    }

    console.log('Student progress:', result);
    res.json(result);

  } catch (err) {
    console.error('Error fetching student progress:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
