const userModel = require('../models/userModel');

exports.getUserByEmail = (req, res) => {
    const email = req.params.email;

    userModel.getUserByEmail(email, (error, user) => {
        if (error) {
            return res.status(500).json({ error: 'Internt serverfel' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Användare inte funnen' });
        }
        res.status(200).json(user);
    });
};

exports.registerUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-post och lösenord krävs' });
    }

    // Skapa ett objekt med användardata som skickas till modellen
    const userData = { email, password };

    // Skicka data till createUser-funktionen i modellen
    userModel.createUser(userData, (error, userId) => {
        if (error) {
            return res.status(500).json({ error: 'Kunde inte skapa användaren' });
        }
        res.status(201).json({ message: 'Användare skapad', userId });
    });
};

