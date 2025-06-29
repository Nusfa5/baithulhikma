const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/authRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const examRoutes = require('./routes/examRoutes');
const examMarksRoutes = require('./routes/examMarksRoutes');
const studentRoutes = require('./routes/studentRoutes');
const stripeRoutes = require('./routes/stripe');
const paymentRoutes = require('./routes/paymentRoutes');
const feesRoutes = require('./routes/feesRoutes');
// Configure CORS with specific options
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/exams', examRoutes);
app.use('/api/exam-marks', examMarksRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fees', feesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
