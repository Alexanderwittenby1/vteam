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

module.exports = {
  getAllUsers,
  getUserById,
};
