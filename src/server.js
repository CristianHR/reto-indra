const { constants } = require('crypto')
const http = require('http');
//const catMe = require('cat-me');
const dotenv = require('dotenv');

const { app } = require('./app')
const port = process.env.SERVER_PORT;

dotenv.config();

async function startApp() {
  try {
    //console.log(catMe('nina'));

    http.createServer({
      secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
    }, app).listen(port, function () {
      console.log(`Servidor en puerto ${port}`);
    });
  } catch (error) {
    console.log('Error al iniciar');
    console.error(error);
  }
}

startApp();