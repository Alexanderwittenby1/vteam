const db = require("../config/dbConfig"); // Importera din databasanslutning

getAllScootersFromdb = (callback) => {
  db.query("SELECT * FROM Scooter;", (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

module.exports = {
  getAllScootersFromdb,
};
