const randomPointsOnPolygon = require('random-points-on-polygon');
const geoPointInPolygon = require('geo-point-in-polygon');
const token = require('../token.js');
const fs = require('fs');
const polyline = require('@mapbox/polyline');
const geoTools = require('geo-tools');
const geolib = require('geolib');
// const { withinDistance } = require('./tripgenerator2.js');


/**
 * 
 * @param {Array} cities - An array of city names to generate trips for.
 * 
 * 
 */

class TripGenerator {
    constructor(cityName) {
        this.maxDistance = 1800;
        this.minDistance = 400;
        this.forbidden = [];
        this.routesPerBike = 1;
        this.bikes = 25;
        this.cityName = cityName.toLowerCase();
        this.cityCoords = [];
        this.stations = [];
        this.parkingZones = [];
        this.boundaries = [];
        this.generateTrips();
    }

    swapCoordinates(coords) {
        return [coords[1], coords[0]];
    }

    async generateTrips() {
        const totalRoutes = this.routesPerBike * this.bikes;
        let city = {}
        try {
            city = require(`../cities/${this.cityName}.json`);
        } catch (err) {
            console.log(err)
        }
        
        city.features.forEach(feature => {
            if (feature.properties.role === "forbidden") {
                this.forbidden.push(feature);
            } else if (feature.properties.role === "zone") {
                this.cityCoords.push(feature);
            } else if (feature.properties.role === "station") {
                this.stations.push(feature);
            } else if (feature.properties.role === "parking") {
                this.parkingZones.push(feature);
            } else if (feature.properties.role === "boundary" || feature.properties.role === "forbidden") {
                this.boundaries.push(feature);
            }
        });
        // console.log(this.forbidden)
 
        for (let i = 0; i < this.bikes; i++) {
            let coords;
            const bikeObject = {
                city: this.cityid,
                initialStart: [],
                trips: [],
                trips_encoded: [],
            };
            for (let j = 0; j < this.routesPerBike; j++) {
                
                try {
                    
                    if (!coords) {
                        
                        coords = this.createStartAndEndPoints();
                        console.log("coords: ",coords)
                    } else {
                        console.log("else")
                        coords = this.createStartAndEndPoints(coords[1]);
                    }


                    const trip = await this.getTrip(coords);
                    const trip_decoded = this.reverseCoords(polyline.decode(trip));
                    const trip_encoded = polyline.encode(trip_decoded);
                    // console.log("trip_decoded: ",this.reverseCoords(trip_decoded));
                        
                    bikeObject.trips_encoded.push(trip_encoded);
                    bikeObject.trips.push(trip_decoded);

                    fs.appendFileSync("./../trips/trips.csv", `"${i}","${j}","${trip_encoded}"r\n`)
            
                }   catch (error) {
                    console.log(error)
                    j--
                }
            }
                bikeObject.initialStart = bikeObject.trips[0][0];
                fs.writeFileSync(`./../trips/${i}.json`, JSON.stringify(bikeObject, null, 4));
        }
    } 

    createStartAndEndPoints(startPointInput =null) {
        
        const numberOfPoints = 1;
       
        // let chance = Math.random() * 11;
        // const totalParkingZones = this.parkingZones.length
        // const totalStationZones = this.stations.length

        // if (chance <= 1.5){
        //     let randomStationPolygon = this.stations[Math.floor(Math.random()* totalStationZones)].geometry.coordinates;
        //     chance < 0.7 ? usedZooneStart = randomStationPolygon : usedZooneEnd = randomStationPolygon;
        // } else if (chance <= 3.5) {
        //     let randomParkingPolygon = this.parkingZones[Math.floor(Math.random()* totalParkingZones)].geometry.coordinates;

        // }
        

        let point= 0;
        while (!point) {
            let startPointCoordsLOLA
            let startPoint
           
            if (!startPointInput) {
                startPoint = randomPointsOnPolygon(numberOfPoints, this.cityCoords[0]);
                startPointCoordsLOLA = startPoint[0].geometry.coordinates;
            } else {
                console.log("input")
                startPointCoordsLOLA = startPointInput;
            }

            let endPoint = randomPointsOnPolygon(numberOfPoints, this.cityCoords[0]);
            let endPointCoordsLOLA = endPoint[0].geometry.coordinates

            console.log("startpointLOLA: ", startPointCoordsLOLA)
            console.log("endpointLOLA", endPointCoordsLOLA)

            // let startPointCoordsLALO = this.swapCoordinates(startPointCoordsLOLA);
            // let endPointCoordsLALO =  this.swapCoordinates(endPointCoordsLOLA); 
            
            // console.log("startpointLALO: ", startPointCoordsLALO)
            // console.log("endpointLALO: ", endPointCoordsLALO)
           
            
            const isWithinDistance = this.isWithinDistance(startPointCoordsLOLA, endPointCoordsLOLA)
            if (isWithinDistance) {
                let inForbidden = false
               
                for (let zone of this.forbidden) {
                    const zoneCoords = zone.geometry.coordinates[0];
                    // console.log("startpoint in forbidden: ",geoPointInPolygon(startPointCoordsLOLA, zoneCoords),"id: ", zone.id)
                    // console.log("endpoint in forbidden: ",geoPointInPolygon(endPointCoordsLOLA, zoneCoords),"id: ", zone.id)

                    if (geoPointInPolygon(startPointCoordsLOLA, zoneCoords) || geoPointInPolygon(endPointCoordsLOLA, zoneCoords)) {
                        console.log("COORDS FAIL")
                        inForbidden = true; 
                        break;
                    }

                }
                if (!inForbidden) {
                    console.log("Startpoint/endpoint SUCCESS")

                    point = [startPointCoordsLOLA, endPointCoordsLOLA]
                    break;
                    
                }  
               
            }
            
        } 
        return point;
       
    }
    reverseCoords(coordsArr) {
        return coordsArr.map((coord) => coord.reverse());
    }

    isWithinDistance(startPoint, endPoint) {
        const distance = geolib.getDistance(
            {latitude: startPoint[0], longitude: startPoint[1]},
            {latitude: endPoint[0], longitude: endPoint[1]}
        );
        // console.log("distance: ", distance)
        return distance >= this.minDistance && distance <= this.maxDistance;
    }
    
    
    async getTrip(coords) {
        try {
            const polygons = this.forbidden.map(feature => feature.geometry.coordinates[0]);
            let params = {
                coordinates: coords,
                options: {
                    avoid_polygons: {
                        type: "MultiPolygon",
                        coordinates: [polygons]
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
            if (resJson.error) {
                console.log('Route error:', resJson.error);
                return null;
            }
            return resJson.routes[0].geometry;
            } catch (error) {
                console.log("API error: ", error)
            }
        }
}

let generate = new TripGenerator("karlshamn2")

module.exports = { TripGenerator }