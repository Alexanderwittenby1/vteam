const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/dbConfig');

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/users', (req, res) => {
    db.query('SELECT * FROM User', (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Internt serverfel' });
        }
        res.status(200).json(result);
    });
});


module.exports = router;
