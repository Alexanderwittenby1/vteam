// components/PaymentPage.tsx
import React from 'react';
import CheckoutForm from './CheckoutForm'; // Importera din betalningsformulärskomponent
import { Elements } from '@stripe/react-stripe-js'; // Importera Elements från Stripe
import { loadStripe } from '@stripe/stripe-js'; // Importera loadStripe från Stripe

// Ladda din public key från Stripe
const stripePromise = loadStripe("pk_test_51QVGmWRoXcO6JWu3lQaHYWRGwBugOpHCTS5b7OfipoM9S7vI14eNnStSgp7dSHJZKJpNfIVG6AZGMAPkrytdyVFS00ktOqdKob");

const PaymentPage: React.FC = () => {
  return (
    // Wrap din CheckoutForm med <Elements> och passera stripePromise
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
