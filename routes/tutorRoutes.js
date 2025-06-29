const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getAssignedClasses,
  getStudentsInClass,
  getClassAttendance,
  getClassPerformance,
  giveFeedback,
  sendAnnouncement,
  getAllTutorsBySubjects
} = require('../controllers/tutorController');



router.get('/assigned-classes',getAssignedClasses);
router.get('/class-students/:classId', getStudentsInClass);
router.get('/class-attendance/:classId',  getClassAttendance);
router.get('/class-performance/:classId',  getClassPerformance);
router.post('/feedback',  giveFeedback);
router.post('/announcement',  sendAnnouncement);

router.get('/tutor-subjects',  getAllTutorsBySubjects);
module.exports = router;
