import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './paymentForm';

const PUBLIC_KEY =
  'pk_test_51Nb4nULGhuSP9aYSAxdf6aQbhLrOH4mUrCUQjZClEcp3toVctTQ3wWlJXhaQTyo9o5GEzpW9KruAqIN3uuXln1qh00jWT6a5hC';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}