
const {DynamoDBService } = require('./dynamodbService');
const swapi = require('swapi-node');

const exc = require('../helpers/exceptions');

function PlanetService () {

    this.planetsOriginal = [];
    this.planetsAttrTranslated= [];
       
}

PlanetService.prototype.getAll = async function () {
    const res  = await swapi.planets();
    this.planetsOriginal = res.results;
    return this.planetsOriginal;
}

PlanetService.prototype.translateTableAttr = async function () {
    try {
        const planetAttributes = require('../lang/database/es.json').planets;
        let dataTranslated = [];

        this.planetsOriginal.forEach((planet, indexPlanet) => {
            const newPlanet = {};

            Object.keys(planet).forEach((value) => {
              const newAttrName = planetAttributes[value];

               newPlanet[newAttrName] = planet[value];
            });

            dataTranslated.push(newPlanet);
        });
        this.planetsAttrTranslated = dataTranslated;
        return dataTranslated;

    } catch (err) {
        console.log(err);
        return {
            error: err.message
        };
    }
}

PlanetService.prototype.insertBatch = async function () {
    try {
        const dynamodbService = new DynamoDBService();
        return dynamodbService.insertBatch(this.planetsAttrTranslated);
    
    } catch (error) {
        return {
            error: err.message
        };
    }
}



module.exports = {PlanetService}












