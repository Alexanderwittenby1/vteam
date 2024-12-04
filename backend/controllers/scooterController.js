const scootermodel = require('../models/scooterModel');

exports.getAll = (req, res) => {
    scootermodel.getAllScootersFromdb((error, scooters) => {
        if (error) {
            return res.status(500).json({ error: 'Internt serverfel' });
        }
        res.status(200).json(scooters);
    });
}
