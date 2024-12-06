const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/autMiddleware");

// Rutt för att hämta alla användare
router.get("/", userController.getAllUsers);

// Rutt för att registrera en användare
router.post("/register", userController.registerUser);

// Rutt för att logga in en användare
router.post("/login", userController.loginUser);

router.get("/profile", verifyToken, userController.getUserByEmail);

module.exports = router;
