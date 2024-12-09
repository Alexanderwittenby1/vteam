const db = require("../config/dbConfig"); // Importera din databasanslutning

getAllUsers = (callback) => {
  db.query("SELECT * FROM user_table;", (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

module.exports = {
  getAllUsers,
};
