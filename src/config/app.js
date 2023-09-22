const dotenv = require('dotenv');
dotenv.config();

module.exports.appConfig = {
  port: process.env.PORT,

  awsLambda:{
    INPUT_POST: 'JSON.parse( req.apiGateway.event.body)',
    INPUT_GET: 'req.query' 
  },
}



