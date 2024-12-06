const db = require("../config/dbConfig"); // Importera din databasanslutning

const getUserById = (userId, callback) => {
  db.query(
    "SELECT * FROM user_table WHERE id = ?",
    [userId],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results[0]);
    }
  );
};

// Funktion för att hämta en användare med e-post
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_table WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      }
    );
  });
};

// Funktion för att skapa en ny användare
const createUser = (userData, callback) => {
  db.query(
    "INSERT INTO user_table SET email = ?, password = ?",
    [userData.email, userData.password],
    (error, results) => {
      if (error) {
        return callback(error, null); // Skicka error till callback
      }
      return callback(null, results); // Skicka resultatet (userId) till callback
    }
  );
};

// Funktion för att hämta alla användare

const getAllUsers = (callback) => {
  db.query("SELECT * FROM user_table", (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Exportera funktionerna så att de kan användas i andra filer
module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getAllUsers,
};
