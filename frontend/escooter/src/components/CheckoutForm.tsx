
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";


// Ladda Stripe
const stripePromise = loadStripe(
  "pk_test_51QVGmWRoXcO6JWu3lQaHYWRGwBugOpHCTS5b7OfipoM9S7vI14eNnStSgp7dSHJZKJpNfIVG6AZGMAPkrytdyVFS00ktOqdKob"
);

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const [isMounted, setIsMounted] = useState(false); // Klient-side rendering state
  // const router = useRouter();

  // Effect för att säkerställa att komponenten har monterats på klienten
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Se till att stripe och elements är redo
    if (!stripe || !elements) {
      setErrorMessage("Stripe.js has not loaded.");
      setLoading(false);
      return;
    }

    // Få fram CardElement från elements
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Card element not found.");
      setLoading(false);
      return;
    }

    // Skapa en token med CardElement
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setErrorMessage(error.message || "Something went wrong.");
      setLoading(false);
      return;
    }

    // Skicka token till backend för att skapa betalning
    const res = await fetch("http://localhost:4000/user/create-charge", {
      method: "POST",
      body: JSON.stringify({ token: token?.id, amount: 5000 }), // Belopp i ören (5000 = 50 SEK)
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      router.push("/success"); // Om betalningen lyckades, navigera till success-sidan
    } else {
      setErrorMessage(data.error || "Something went wrong, please try again.");
    }

    setLoading(false);
  };

  // Rendera ingenting förrän komponenten har monterats på klientsidan
  if (!isMounted) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div id="card-element">
        <CardElement />
      </div>

      <button disabled={loading} type="submit">
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
