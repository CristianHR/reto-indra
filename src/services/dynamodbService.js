const { v4 } = require('uuid');

const AWS = require('aws-sdk');
/*
const {
    DynamoDBClient,
    paginateListTables,
  } = require("@aws-sdk/client-dynamodb");*/
  
const exc = require('../helpers/exceptions');
 

function DynamoDBService () {
    this.dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
}

DynamoDBService.prototype.parceToDynamoDB = function (value) {
    let typeData = '';
    switch(typeof value){
        case 'string':
            typeData = 'S';
            break;
        case 'number':
            typeData = 'N';
            break;
        case 'boolean':
            typeData = 'BOOL';
            break;
        case 'undefined':
            typeData = 'NULL'
        default: // object type => Array
            typeData = (value.constructor.toString().indexOf('Array') > -1)? 'SS' : 'M';
    }
    return {
        [typeData]: value
    }
}
DynamoDBService.prototype.insertBatch = async function (data) {
    const _this = this;

    let dataBatch = [];
    data.forEach( (value, index) => {
    //let dataBatch = data.map( (value, index) => {
        if(index <= 1){
        
            const newValue = Object.entries(value).map((item)=>{

                return [
                    [item[0]],
                    _this.parceToDynamoDB(item[1])
                ]
            });

           
            dataBatch.push(
                {
                    'PutRequest': {
                        'Item': {id:{'S':v4()},
                            ...Object.fromEntries(newValue)}
                        //'Item': value
                    }
                }
            );
             
        }
    });
    let params = {
        RequestItems: {
            "PlanetsTable": dataBatch
        }
    }

    const respose = await this.dynamodb.batchWriteItem(params, function(err, response) {

        if (err) console.log('error dynamosbatch', err); // an error occurred
        else     console.log('Exito al registrar', response);           // successful response
    });

    return respose;
    
}

module.exports = {DynamoDBService}















