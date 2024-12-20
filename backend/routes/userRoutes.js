const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/autMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const dotenv = require("dotenv");
dotenv.config(); // Ladda miljövariabler från .env fil

// Stripe-konfiguration (använd miljövariabel istället för att skriva nyckeln direkt)
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Rutt för att registrera en användare (utan inloggning)
router.post("/register", userController.registerUser);

// Rutt för att logga in en användare (utan inloggning)
router.post("/login", userController.loginUser);

// Rutter för att hämta användaruppgifter
router.get("/profile", verifyToken, userController.getUserByEmail);

// Rutt för att hämta alla trips för en användare (kräver att användaren är inloggad)
router.get("/trips", verifyToken, userController.getTripsByUserId);

// Rutt för att lägga till en trip (kräver att användaren är inloggad)
router.post("/addTrip", verifyToken, userController.addTrip);

// Rutt för att hämta alla användare (endast för admin)
router.get("/admin", verifyToken, isAdmin, userController.getAllUsers);

// Rutt för att uppdatera lösenordet
router.put("/updatePassword", verifyToken, userController.updatePassword);

// Rutt för att sätta in pengar på sitt konto (kräver att användaren är inloggad)
router.put("/addMoney", verifyToken, userController.addMoney);

// Rutt för att skapa en Stripe Checkout-session
// router.post("/create-checkout-session", async (req, res) => {
//   try {
//     console.log("Request body:", req.body); // Logga indata från frontend för debugging

//     // Definiera URL:erna för success och cancel
//     const successUrl = `${
//       req.headers.origin || "http://localhost:3000"
//     }/success?session_id={CHECKOUT_SESSION_ID}`;
//     const cancelUrl = `${req.headers.origin || "http://localhost:3000"}/cancel`;

//     // Skapa en Stripe-session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: req.body.items.map((item) => ({
//         price_data: {
//           currency: "sek", // Valuta
//           product_data: {
//             name: item.name, // Produktens namn
//           },
//           unit_amount: item.amount, // Beloppet (i öre)
//         },
//         quantity: item.quantity, // Antal av produkten
//       })),
//       mode: "payment", // Betalningsläge (köp)
//       success_url: successUrl, // URL för framgång
//       cancel_url: cancelUrl, // URL för avbrytning
//     });

//     console.log("Stripe session created:", session); // Logga Stripe-sessionen för debugging

//     // Skicka tillbaka sessionens ID till frontend
//     res.json({ id: session.id });
//   } catch (err) {
//     console.error("Error creating checkout session:", err); // Logga fel
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/webhook', (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     // Verifiera och parse payloaden från Stripe
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.log(`Webhook error: ${err.message}`);
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }

//   // Hantera de händelser du är intresserad av
//   if (event.type === 'payment_intent.succeeded') {
//     const paymentIntent = event.data.object; // Detta innehåller detaljer om betalningen

//     // Uppdatera din databas med den betalningsinformation
//     const userId = paymentIntent.metadata.user_id; // Anta att du sparat användar-ID som metadata
//     const amountPaid = paymentIntent.amount_received; // Beloppet som betalades (i minsta enhet, t.ex. ören)

//     // Här kan du göra en SQL-uppdatering för att uppdatera användarens balans
//     updateUserBalance(userId, amountPaid);
//   }

//   res.status(200).send('Webhook received');
// });

module.exports = router;
