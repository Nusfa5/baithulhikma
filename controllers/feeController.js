const Subject_StudentModel = require('../models/student_subjects');
const SubjectModel = require('../models/subject');
const PaymentModel = require('../models/payment');

const getStudentFeeStatus = async (req, res) => {
  const student_email = req.params.email;

  try {
   
    const [subjectStudentRows] = await Subject_StudentModel.getStudentSubjects(student_email);

    const subjectIds = subjectStudentRows.map(row => row.subject_id);

    if (subjectIds.length === 0) {
      return res.status(404).json({ message: 'Student not enrolled in any subjects.' });
    }

    // Step 2: Fetch subject details and total fees
    let totalFees = 0;

    for (let subject_id of subjectIds) {
      const [subjectDetails] = await SubjectModel.getSubject(subject_id);
      if (subjectDetails.length > 0) {
        totalFees += subjectDetails[0].fees;
      }
    }

    
    const [paymentRows] = await PaymentModel.getStudentPayment(student_email);
    const totalPaid = paymentRows.reduce((sum, payment) => sum + payment.amount, 0);

    // Step 4: Calculate balance and determine status
    const balance = totalFees - totalPaid;

    const status = balance > 0 ? 'Pending' : 'Paid';

    res.json({
      student_email,
      totalFees,
      totalPaid,
      balance,
      status,
    });
  } catch (error) {
    console.error('Error in getStudentFeeStatus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getStudentFeeStatus,
};
