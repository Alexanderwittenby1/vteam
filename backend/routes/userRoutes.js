const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutt för att hämta alla användare
router.get('/' , userController.getAllUsers);

router.get('/id/:id', userController.getUserById);

// Rutt för att hämta en användare med e-postadress.
router.get('/:email', userController.getUserByEmail);

// Rutt för att registrera en användare
router.post('/register', userController.registerUser);


router.get('/login/:id', userController.getUserById);

module.exports = router;
