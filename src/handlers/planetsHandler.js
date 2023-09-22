const serverless = require('serverless-http');
const PlanetController = require('../controllers/PlanetsController');

const {app} = require('../app');

app.use('*' , PlanetController);
/*
const controller = serverless(PlanetController);

module.exports.handler = async (event, context) => {
    console.log('Starting People Service ...');
    return controller(event, context);
};*/

module.exports.handler =  serverless(app)



