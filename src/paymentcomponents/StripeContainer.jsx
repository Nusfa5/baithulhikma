import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'; 

const stripePromise = loadStripe('pk_test_51RKy3QE2DDNl5ffIy37uFwPBIPuMFTqBsfUdhyv6ewzqrGzn4AmIw7BJkK3ULl471ENVws1wLHt6gdQROwdawyBL00g5sEtjoW'); // Public test key
console.log('stripePromise:', stripePromise);
const StripeContainer = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} /> 
    </Elements> 
  );
};

export default StripeContainer;
