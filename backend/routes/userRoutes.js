const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/autMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// Rutt för att registrera en användare (utan inloggning)
router.post("/register", userController.registerUser);

// Rutt för att logga in en användare (utan inloggning)
router.post("/login", userController.loginUser);

// Rutt för att hämta användarens profil (kräver att användaren är inloggad)
router.get("/profile", verifyToken, userController.getUserByEmail);

// Rutt för att hämta alla trips för en användare (kräver att användaren är inloggad)
router.get("/trips", verifyToken, userController.getTripsByUserId);

// Rutt för att lägga till en trip (kräver att användaren är inloggad)
router.post("/addTrip", verifyToken, userController.addTrip);

router.get("/admin", verifyToken, isAdmin, userController.getAllUsers);
module.exports = router;
