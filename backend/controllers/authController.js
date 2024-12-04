const { generateToken } = require('../services/authService');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        // Skapa en användare i databasen (exempel, beroende på din modell)
        const user = await userModel.createUser(req.body);
        
        // Generera en token
        const token = generateToken(user);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Fel vid registrering av användare', error: error.message });
    }
};

const login = (req, res) => {
    // Simulera en användare (i en verklig app ska du verifiera användaren mot databasen)
    const user = {
        id: 1,
        email: 'testuser@example.com'
    };

    if (!user) {
        return res.status(404).json({ message: 'Användaren hittades inte' });
    }
    // Generera en JWT-token
    const token = generateToken(user);

    res.status(200).json({ token });
};

module.exports = {
    registerUser,
    login
};
