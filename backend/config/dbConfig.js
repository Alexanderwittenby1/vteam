const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'yourUsername',
    password: process.env.DB_PASSWORD || 'yourPassword',
    database: process.env.DB_NAME || 'scooter_sharing'
});

module.exports = pool;
