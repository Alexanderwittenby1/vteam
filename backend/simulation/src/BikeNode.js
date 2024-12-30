const dbModules = require("./dbmodules.js");

class BikeNode {
    constructor() {
        this.scooter_id
        this.city_id 
        this.latitude
        this.longitude
        this.battery_level
        this.is_available
        this.needs_service
        this.is_charging
        this.last_maintenance
        this.status
        this.init()
    }

    setPosition(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    setCity(city_id) {
        this.city_id = city_id;
    }

    setStatus(status) {
        this.status = status;   
    }

    setBatteryLevel(battery_level) {
        this.battery_level = battery_level;
    }

    setIsAvailable(is_available) {
        this.is_available = is_available;
    }

    setLastMaintenance(last_maintenance) {
        this.last_maintenance = last_maintenance;
    }



    init() {
        // dbModules.intiateScooters(1);
    }

}

class simulateBikeNode extends BikeNode {
    constructor() {
        super();
        // this.initSimulationActivity();
    }

}

module.exports = simulateBikeNode