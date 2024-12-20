const dbModules = require("./dbmodules.js");

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

module.exports = {
    "checkBikeInitiation": checkBikeInitiation
}