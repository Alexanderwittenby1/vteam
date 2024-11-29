const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const dotenv = require('dotenv');
const app = express();

// Använd miljövariabler
dotenv.config();


const config = {
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'dbadm',
  password: process.env.DB_PASSWORD || 'Passw0rd',
  database: process.env.DB_NAME || 'scooter_sharing'
};

const PORT = process.env.PORT || 4000;

// Skapa en databasanslutning med en pool för bättre prestanda
const pool = mysql.createPool(config);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Hantera förfrågningar till /scooters
app.get('/scooters', (req, res) => {
    pool.query('SELECT * FROM Scooter', (error, results) => {
        if (error) {
            console.error('Databasfel: ', error.message);
            res.status(500).json({ error: 'Internt serverfel' });
            return;
        }
        res.json(results);
    });
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Hantera serveravstängning och stäng databasanslutningen
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Fel vid stängning av databasanslutning: ', err.message);
        } else {
            console.log('Databasanslutning stängd');
        }
        process.exit(0);
    });
});
