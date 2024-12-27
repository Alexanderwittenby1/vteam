const BikeNode = require("./BikeNode.js");
class Simulation {
    constructor() {
        this.init()
        this.allBikeNodes = {}
        this.ApiEndpoint = "http://localhost:4000/api/"

    }

    testResponse() {
        return "This simulation is running"
    }

    createNewBikeNode(amount) {
        if (amount > 1000) {
            return "A maximum of 1000 bikes are allowed.";
        } else {
            for (let i = 0; i < amount; i++) {
                this.allBikeNodes.push(new BikeNode());
            }
            return this.allBikeNodes.length;
        }
    }
    
    init() {

    }
}

module.exports = Simulation;