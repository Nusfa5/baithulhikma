const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/create', examController.createExam);

 router.get('exam-results/:email', examController.getStudentExam);
 router.get('/exams', examController.getAllExams);
 router.get('/performance', examController.getStudentPerformance);
 router.get('/results', examController.getStudentMarks);
// router.post('/addmark', examController.addMark);    
// router.get('/student/:student_id', examController.getStudentMarks);
// router.get('/student/:student_id/exam/:exam_id', examController.getStudentExamMark);

module.exports = router;

