const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/autMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get("/", verifyToken, isAdmin, adminController.getAllUsers);

// Route to get a user by ID
router.get("/profile/:id", verifyToken, isAdmin, adminController.getUserById);

// uppdatera en annan användares profil

<<<<<<< HEAD
router.put("/updateUser/:id", verifyToken, isAdmin, adminController.updateUser);
=======
router.put("/update/:id", verifyToken, isAdmin, adminController.updateUser);
>>>>>>> d7713f8385c38fad1b0b54efdbfcc18c1d1f7268

// Route to delete a user by ID
router.delete("/delete/:id", verifyToken, isAdmin, adminController.deleteUser);


module.exports = router;