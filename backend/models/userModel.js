const db = require('../config/dbConfig'); // Importera din databasanslutning
const bcrypt = require('bcrypt'); 
const saltRounds = 10;



const getUserById = (userId, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results[0]);
    });
};

// Funktion för att hämta en användare med e-post
const getUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results[0]);
    });
};

// Funktion för att skapa en ny användare
const createUser = (userData, callback) => {
    db.query('INSERT INTO User SET email = ?, password = ?', [userdata.email, userData.password], (error, results) => {
        if (error) {
            return error
        }
        return results
    });
};

// Exportera funktionerna så att de kan användas i andra filer
module.exports = {
    getUserById,
    getUserByEmail,
    createUser
};
