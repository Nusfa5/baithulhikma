const express = require('express');
const router = express.Router();
const { getStudentFeeStatus } = require('../controllers/feeController');

router.get('/status/:email', getStudentFeeStatus);

module.exports = router;
