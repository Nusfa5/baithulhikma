const express = require('express');
const router = express.Router();
const { createPayment,getAllPaymentsByStudents } = require('../controllers/paymentController');

router.post('/create-payment-intent', createPayment);
router.get('/all-payments', getAllPaymentsByStudents);
module.exports = router;
