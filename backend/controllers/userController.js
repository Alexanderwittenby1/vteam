const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    

    if (!email || !password) {
        return res.status(400).json({ message: 'E-post och lösenord krävs' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = { email, password: hashedPassword };
        
        
        userModel.createUser(userData, (error, userId) => {
        if (error) {
            console.error("Fel vid skapande av användare:", error);  // Logga felet
            return res.status(500).json({ error: 'Kunde inte skapa användaren' });
        }
        res.status(201).json({ message: 'Användare skapad', userId });
    });
    }catch
    {
        console.error("Fel vid skapande av användare:", error);  // Logga felet
        return res.status(500).json({ error: 'Kunde inte skapa användaren' });
    }
    

};


exports.getAllUsers = (req, res) => {
    userModel.getAllUsers((error, users) => {
        if (error) {
            return res.status(500).json({ error: 'Internt serverfel' });
        }

        // Filtrera användardatan om du bara vill ha vissa fält
        const filteredUsers = users.map(user => ({
            email: user.email,
            balance: user.balance,
            created_at: user.created_at
        }));

        res.status(200).json({
            message: "Användare hämtade framgångsrikt",
            data: filteredUsers
        });
    });
}



exports.getUserById = (req, res) => {
    const userId = req.params.id;

    userModel.getUserById(userId, (error, user) => {
        if (error) {
            return res.status(500).json({ error: 'Internt serverfel' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Användare inte funnen' });
        }
        res.status(200).json(user);
    });
}


