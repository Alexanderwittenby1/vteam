'use client'; // Viktigt för att använda klientkod i app-mappen

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

console.log(loadStripe);
const stripePromise = loadStripe('pk_test_51QVGmWRoXcO6JWu3lQaHYWRGwBugOpHCTS5b7OfipoM9S7vI14eNnStSgp7dSHJZKJpNfIVG6AZGMAPkrytdyVFS00ktOqdKob'); // Ersätt med din Stripe publishable key

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(''); // Rensa eventuella tidigare felmeddelanden

    try {
      // Skicka begäran till backend för att skapa en Stripe Checkout-session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              name: 'Exempelprodukt', // Produktens namn
              amount: 1000, // Belopp i öre (1000 = 10 kr)
              quantity: 1, // Antal produkter
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { id } = await response.json(); // Ta emot sessionId från backend
      console.log('Session ID received:', id); // Logga session-id för debugging

      // Ladda Stripe och omdirigera till checkout
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: id, // Använd det sessionId som backend skickade
        });

        if (error) {
          console.error('Stripe error:', error);
          setErrorMessage(error.message); // Visa Stripe-felmeddelandet för användaren
        }
      } else {
        setErrorMessage('Stripe could not be loaded. Please try again later.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setErrorMessage('An error occurred while processing your payment. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Checkout</h1>
      <button
        className={`btn btn-primary ${loading ? 'disabled' : ''}`}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Redirecting to checkout...' : 'Betala med Stripe'}
      </button>

      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Checkout;


