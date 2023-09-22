'use strict';

const express = require('express');
const router = express.Router();
const {appConfig} = require('../config/app')
const {PlanetService} = require('../services/PlanetService');

const catchErrors = require('../helpers/catchErrors');

router.get('/', [
  ], async (req, res, next) => {
    // LOGICA A IMPLEMENTAR
    // Consultar la API de SWAPI
    // Mapear los campos de ingles a español
    // Guardar en la base de datos Dynamodb
    // Respoder la Data al FRONT
    console.log('Response from Planets controller ')
    let response = {ok:false};
    const queryData = eval(appConfig.awsLambda.INPUT_GET);
    try {
      
      const planetService =  new PlanetService();

      const result = await planetService.getAll();
      const transtaledAttr = await planetService.translateTableAttr();
       await planetService.insertBatch();
      res.json({ok:'success', results: transtaledAttr});
        
  } catch (e) {      
    console.log(e);
    let resErr = catchErrors(e,response);
    req.logRequest = {
      errLog:true,
      dataRes:resErr.response,
      statusCode:resErr.statusCode
    }
  } finally {
    next()
  }  
});

router.post('/', [
  ], async (req, res, next) => {
    // Registro la API de SWAPI
    
    
});



module.exports = router;