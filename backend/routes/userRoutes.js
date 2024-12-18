const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/autMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const dotenv = require("dotenv");
dotenv.config();
const Stripe = require('stripe')
const stripe = Stripe(process
.env.STRIPE_SECRET_KEY); // Ersätt med din Stripe secret key

// Rutt för att registrera en användare (utan inloggning)
router.post("/register", userController.registerUser);

// Rutt för att logga in en användare (utan inloggning)
router.post("/login", userController.loginUser);

// rutter för att hämta användare

router.get("/profile", verifyToken, userController.getUserByEmail);

// Rutt för att hämta alla trips för en användare (kräver att användaren är inloggad)
router.get("/trips", verifyToken, userController.getTripsByUserId);

// Rutt för att lägga till en trip (kräver att användaren är inloggad)
router.post("/addTrip", verifyToken, userController.addTrip);

router.get("/admin", verifyToken, isAdmin, userController.getAllUsers);

// Rutt för att uppdatera lösenordet
router.put("/updatePassword", verifyToken, userController.updatePassword);

// Rutt för att sätta in pengar på sitt konto (kräver att användaren är inloggad) #### ----> Vet inte om detta är slutlig lösning <---- ####
router.put("/addMoney", verifyToken, userController.addMoney);

router.post('/create-charge', async (req, res) => {
  const { token } = req.body;

  try {
    // Skapa betalning (charge)
    const charge = await stripe.charges.create({
      amount: 5000,  // Belopp i cent (5000 = 50 SEK)
      currency: 'sek', // Valuta
      description: 'Test Payment',
      source: token,  // Token från frontend
    });

    // Om betalningen är lyckad
    res.status(200).json({ success: true, charge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
