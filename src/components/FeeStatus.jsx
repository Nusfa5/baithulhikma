import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const FeeStatus = ({ studentEmail }) => {
  const [fees, setFees] = useState({ total: 0, paid: 0, due: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  });

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fees/status/${studentEmail}`);
        const data = await response.json();

        if (response.ok) {
          setFees({
            total: parseFloat(data.totalFees),
            paid: parseFloat(data.totalPaid),
            due: parseFloat(data.balance),
          });
        } else {
          console.error("Failed to fetch fee status:", data);
        }
      } catch (error) {
        console.error("Failed to fetch fee status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (studentEmail) {
      fetchFeeStatus();
    }
  }, [studentEmail]);

  const handleStripe = async () => {
    try {
      const stripe = await loadStripe("pk_test_51RKy3QE2DDNl5ffIy37uFwPBIPuMFTqBsfUdhyv6ewzqrGzn4AmIw7BJkK3ULl471ENVws1wLHt6gdQROwdawyBL00g5sEtjoW");

      const sessionResponse = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_email: studentEmail,
          amount_due: fees.due,
        }),
      });

      const session = await sessionResponse.json();

      if (!sessionResponse.ok || !session.id) {
        throw new Error(session.message || "Stripe session creation failed");
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        alert("Payment failed to start. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment process failed. Please try again.");
    }
  };

  if (isLoading) return <div className="text-muted">Loading fee status...</div>;

  return (
    <div className="bg-white p-4 p-md-5 rounded shadow animate__animated animate__fadeIn">
      <h2 className="text-primary fw-bold fs-4 mb-4 border-bottom pb-2">💳 Fee Status</h2>
      <ul className="list-unstyled fs-6 mb-4">
        <li className="mb-2"><strong>Total Fees:</strong> <span className="text-dark">{formatter.format(fees.total)}</span></li>
        <li className="mb-2"><strong>Paid:</strong> <span className="text-success">{formatter.format(fees.paid)}</span></li>
        <li className="mb-2"><strong>Due:</strong> <span className="text-danger">{formatter.format(fees.due)}</span></li>
      </ul>

      {fees.due > 0 && (
        <button
          className="btn btn-success fw-semibold px-4 py-2"
          onClick={handleStripe}
        >
          💵 Pay Now
        </button>
      )}

      {fees.due <= 0 && (
        <div className="alert alert-success mt-3">
          ✅ All fees are paid. Thank you!
        </div>
      )}
    </div>
  );
};

export default FeeStatus;
