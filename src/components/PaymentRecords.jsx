import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentRecords = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payment/all-payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-primary mb-3">💳 Payment Records</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-warning">
          <tr>
            <th>Transaction ID</th>
            <th>Student</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.payment_id}</td>
                <td>{payment.student_email}</td>
                <td>${payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No payment records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentRecords;
