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

addScooterToDb = (scooterData, callback) => {
  db.query(
    "INSERT INTO Scooter (city_id, latitude, longitude, battery_level, is_available, needs_service, is_charging, last_maintenance, status) VALUES (?,?,?,?,?,?,?,?,?,?);",
    [
      scooterData.city_id,
      scooterData.latitude,
      scooterData.longitude,
      scooterData.battery_level,
      scooterData.is_available,
      scooterData.needs_service,
      scooterData.is_charging,
      scooterData.last_maintenance,
      scooterData.status,
    ],
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
  addScooterToDb,
};
