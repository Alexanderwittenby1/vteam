const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/autMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.registerUser);
// router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
