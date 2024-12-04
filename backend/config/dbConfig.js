const mysql = require("mysql2");

const pool = mysql.createPool({
<<<<<<< HEAD
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'yourUsername',
    password: process.env.DB_PASSWORD || 'P@ssw0rd',
    database: process.env.DB_NAME || 'scooter_sharing'
=======
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "adabm",
  password: process.env.DB_PASSWORD || "P@ssw0rd",
  database: process.env.DB_NAME || "scooter_sharing",
>>>>>>> origin/feature/login-register
});

module.exports = pool;
