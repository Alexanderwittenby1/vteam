const randomPointsOnPolygon = require('random-points-on-polygon');
const geoPointInPolygon = require('geo-point-in-polygon');
const token = require('../token.js');
const fs = require('fs');
const polyline = require('@mapbox/polyline');
const geoTools = require('geo-tools');


/**
 * 
 * @param {Array} cities - An array of city names to generate trips for.
 * 
 * 
 */

class TripGenerator {
    constructor(cityName) {
        this.maxDistance = 600;
        this.minDistance = 250;
        this.forbidden = [];
        this.sameStartEnd = false;
        this.routesPerBike = 2;
        this.bikes = 5;
        this.cityName = cityName.toLowerCase();
        this.cityCoords = [];
        this.stations = [];
        this.parkingZones = [];
        this.generateTrips();
    }

    swapCoordinates(coords) {
        return [coords[1], coords[0]];
    }

    async generateTrips() {
        const totalRoutes = this.routesPerBike * this.bikes;
        const city = require(`../cities/${this.cityName}.json`);
        
        city.features.forEach(feature => {
            if (feature.properties.role === "forbidden") {
                this.forbidden.push(feature);
            } else if (feature.properties.role === "zone") {
                this.cityCoords.push(feature);
            } else if (feature.properties.role === "station") {
                this.stations.push(feature);
            } else if (feature.properties.role === "parking") {
                this.parkingZones.push(feature);
            }
        });
        // console.log(this.forbidden)
        
        // for (let i=0; i < this.bikes; i++) {
             const initialCoords = this.createStartAndEndPoints();
        // }
    } 

    createStartAndEndPoints() {
        const numberOfPoints = 1;
        let startPoint = randomPointsOnPolygon(numberOfPoints, this.cityCoords[0]);
        console.log(startPoint)
        startPoint[0].geometry.coordinates = this.swapCoordinates(startPoint[0].geometry.coordinates);
        console.log(startPoint[0].geometry.coordinates)
        // console.log(startPoint.geometry.coordinates)
    }


    async getCoords(start,end) {
        let params = {
            coordinates:[start, end],
            // preference:"shortest",
            options:
            {
                avoid_polygons:
                {
                    coordinates: this.forbidden,
                    "type":"MultiPolygon"
                }
            }
        }
        const url = "https://api.openrouteservice.org/v2/directions/cycling-electric/json";
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(params)
        });
        const resJson = await res.json();
        console.log(resJson)
        return resJson.routes[0].geometry;
    }
}

let generate = new TripGenerator("karlshamn")

module.exports = { TripGenerator }