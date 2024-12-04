const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const fs = require('fs');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const logEvents = require('./middleware/logEvents');
const { log } = require('console');
const verifyToken = require('./middleware/autMiddleware');
const db = require('./config/dbConfig');

// Importera routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const scooterRoutes = require('./routes/scooterRoutes');

// Använd miljövariabler
dotenv.config();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'  
}));

app.use(cookieParser());
app.use(compression());
app.use(express.json());

app.use('/auth', authRoutes);

// Rutt för att skapa användare osv.
app.use('/user', userRoutes);
app.use('/scooter', scooterRoutes);


app.use(async (req, res, next) => {
    await logEvents(req, res, next); // Vänta på att loggningen ska slutföras
    next(); // Gå vidare till nästa middleware
});


const PORT = process.env.PORT || 4000;


// Starta servern
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});




process.on('SIGINT', () => {
    db.end((err) => { 
        if (err) {
            console.error('Fel vid stängning av databasanslutning: ', err.message);
        } else {
            console.log('Databasanslutning stängd');
        }
        process.exit(0);
    });
});






