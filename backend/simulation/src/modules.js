const dbModules = require("./dbmodules.js");
const fs = require('fs');
const path = require('path');

function checkBikeInitiation(amount) {
    amount = parseInt(amount)
    if (!(Number.isInteger(amount))) {
        console.log("provide a integer!")
    } else {
        amount > 1000 ? amount = 1000 : amount = amount;
        const result = dbModules.intiateScooters(amount);
        console.log(result)
    }
}


function checkTrips() {
    try {
        const tripsPath = './trips/0.json';
        return fs.existsSync(tripsPath);
    } catch (error) {
        return false;
    }
}


function reset() {
    try {
        const tripsDir = './trips';
        
        if (fs.existsSync(tripsDir)) {
            // Delete all JSON files
            const files = fs.readdirSync(tripsDir);
            files.forEach(file => {
                const filePath = path.join(tripsDir, file);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }
        
        console.log('All simulation data has been reset');
        return true;
    } catch (error) {
        console.error('Error resetting data:', error.message);
        return false;
    }
}


module.exports = {
    "checkBikeInitiation": checkBikeInitiation,
    "checkTrips": checkTrips,
    "reset": reset
}