module.exports = function catchErrors(e,response) {  
    let statusCode = 200;  
    if(e.code === 403){
        response.message = 'No tiene los permisos para realizar';
        statusCode=403;
    }else if(e.code === 404){
        response.message = e.message;
        statusCode=404;
    }else if(e.code === 401){
        response.message = e.message;
        statusCode=401;    
    }else if(e.code === 503){
        response.message = e.message;
        statusCode=503;
    }
    else  if(e.message && e.field){
        statusCode=400;
        response.message = e.message;
        response.error = e;
    }else if(e.message && !e.field){
        statusCode=503;
        response.message = 'Error interno en el servicio ';
    } else {
        statusCode=503;
        response.message = 'Error inesperado en el servicio ';
    }
    return {response,statusCode}
}

