import React from 'react';
import StripeContainer from './StripeContainer';

const PaymentPage = () => {
  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <StripeContainer amount={1000} /> {/* 1000 = $10.00 */}
    </div>
  );
};

export default PaymentPage;
