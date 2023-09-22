'use strict';
const express = require('express');
const dotenv = require('dotenv');
const exc = require('./helpers/exceptions');

const app = express();
app.use(express.json());
dotenv.config();

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {      
      return res.status(415).send({ ok: false, message: "Error de sintaxis en el BODY o QUERY" }); // Bad request
  }
  next();
});
app.use(  function (err, req, res, next) {
  
  console.log(err);

  if (err instanceof exc.HTTPError) {

    res.status(err.code).end(err.message);

  } else if (err instanceof exc.ValidationError) {

    res.json({
      ok: false,
      message: err.toString()
    });

  } else {

    const _ = {
      ok: false
    };
    _.message = 'Error inesperado de API';
    res.status(500);
    res.json(_);
  }
});

module.exports.app = app;








