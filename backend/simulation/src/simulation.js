
const BikeNode = require("./BikeNode.js");
const TripGenerator = require('./tripGen.js');

class Simulation {
    constructor() {
        this.init()
        this.allBikeNodes = []
        this.totalBikes = 0;
        this.ApiEndpoint = "http://localhost:4000/api/"
        this.cities = [];
    }

    testResponse() {
        return "This simulation is running"
    }

    async generateTrips(amount) {
        let bikesPerCity = this.bikesPerCity();
        console.log("bikespercity: ", bikesPerCity);
        let currentId = 0;
        
        for (let i = 0; i < bikesPerCity.length; i++) {
            let tripGen = new TripGenerator();
            console.log("Processing city:", this.cities[i]);
            
            tripGen.routesPerBike = amount;
            tripGen.generationId = currentId;  
            tripGen.setCityName(this.cities[i]);
            tripGen.bikes = bikesPerCity[i];
            

            await tripGen.generateTrips();
            currentId += tripGen.bikes;  
        }
    }
    
    bikesPerCity() {
        const bikesPerCity = Math.floor(this.totalBikes / this.cities.length);
        const modulus = this.totalBikes % this.cities.length;
        let set = [];
        
        for (let i = 0; i < this.cities.length; i++) {
            set.push(bikesPerCity);
        }
        
        if (modulus) {
            set[0] += modulus;
        }
        return set;
    }
    
    setCities(cities) {
        this.cities = cities;
    }

    createNewBikeNode(amount) {
        if (amount > 1000) {
            return "A maximum of 1000 bikes are allowed.";
        } else {
            for (let i = 0; i < amount; i++) {
                this.allBikeNodes.push(new BikeNode());
            }
            this.totalBikes = amount;
        }
    }
    
    init() {
    }
}

module.exports = Simulation;
