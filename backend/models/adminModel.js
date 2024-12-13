const db = require("../config/dbConfig"); // Importera din databasanslutning

getAllUsers = (callback) => {
  db.query("SELECT * FROM user_table;", (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

const getUserById = (userId, callback) => {
  db.query(
    "SELECT * FROM user_table WHERE user_id = ?;",
    [userId],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results[0]);
    }
  );
};

const updateUser = (userId, email, password, role, callback) => {
  db.query(
    "UPDATE user_table SET email = ?, password = ?, role = ? WHERE user_id = ?;",
    [email, password, role, userId],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    }
  );
};

module.exports = {
  getAllUsers,
  getUserById,
};
