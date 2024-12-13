const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/autMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get("/", verifyToken, isAdmin, adminController.getAllUsers);

// Route to get a user by ID
router.get("/profile/:id", verifyToken, isAdmin, adminController.getUserById);

module.exports = router;
