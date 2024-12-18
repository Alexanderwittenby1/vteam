// src/components/StripeWrapper.tsx

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Ladda din Stripe public key
const stripePromise = loadStripe("pk_test_51QVGmWRoXcO6JWu3lQaHYWRGwBugOpHCTS5b7OfipoM9S7vI14eNnStSgp7dSHJZKJpNfIVG6AZGMAPkrytdyVFS00ktOqdKob");

interface StripeWrapperProps {
  children: React.ReactNode;
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
