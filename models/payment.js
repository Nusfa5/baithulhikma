const db = require('../models/db');
const PaymentModel = {
  // Payment table
  createPaymentt: ({ payment_id,student_email, amount, lastPaidDate,nextPaymentDate }) => {
    return db.query(
      'INSERT INTO payments (payment_id,student_email, amount,lastPaidDate,nextPaymentDate) VALUES ( ?, ?,?,?,?)',
      [payment_id,student_email, amount,lastPaidDate,nextPaymentDate]
    
    );
  },

  getAllPayments: () => {
    return db.query('SELECT * FROM payments');
  },

  getStudentPayment: (student_email) => {
    return db.query(
      'SELECT * FROM payments WHERE student_email = ?',
      [student_email]
    );
  },
  getPendingPayments: () => {
    return db.query(
      'SELECT * FROM payments WHERE nextPaymentDate > CURDATE()'
    );
  },

  getAllPaymentsByStudents: () => {
  return db.query(`
    SELECT p.payment_id, s.student_name, p.amount, 
           CASE 
             WHEN p.nextPaymentDate > CURDATE() THEN 'Pending'
             ELSE 'Paid'
           END AS status
    FROM payments p
    JOIN student s ON p.student_email = s.email
  `);
},

};

module.exports = PaymentModel;