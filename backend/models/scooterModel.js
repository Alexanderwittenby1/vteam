const db = require("../config/dbConfig"); // Importera din databasanslutning

getAllScootersFromdb = (callback) => {
  db.query("SELECT * FROM Scooter;", (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

getRecentTrips = (callback) => {
  db.query(
    "SELECT * FROM Trip ORDER BY trip_id DESC LIMIT 10;",
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    }
  );
};

module.exports = {
  getAllScootersFromdb,
};
