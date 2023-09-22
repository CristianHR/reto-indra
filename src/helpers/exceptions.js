'use strict';

const util = require('util');

function HTTPError(statusCode, message) {
  this.code = statusCode;
  this.message = message;
}


module.exports.HTTPError = HTTPError;

function UnexpectedError(message) {
  this.message = message;
}
UnexpectedError.prototype.toString = function () {
  return this.message;
};

module.exports.UnexpectedError = UnexpectedError;

function ValidationError(field, message) {
  this.field = field;
  this.message = message;
}
ValidationError.prototype.toString = function () {
  const _ = {};
  if (_[this.field] == null) _[this.field] = [];
  _[this.field].push(this.message);
  return _;
};

function RequiredField(field) {
  //RequiredField.super_.apply(this, [field, 'the '+field+' field is required']);
  RequiredField.super_.apply(this, [field, 'El campo '+field+' es requerido']);
}
util.inherits(RequiredField, ValidationError);

function FieldsMismatch(field) {
  //FieldsMismatch.super_.apply(this, [field, 'fields do not match']);
  FieldsMismatch.super_.apply(this, [field, 'Los campos '+field+' no coinciden']);
}
util.inherits(FieldsMismatch, ValidationError);

function InvalidValue(field) {
 // InvalidValue.super_.apply(this, [field, 'invalid value']);
  InvalidValue.super_.apply(this, [field, 'valor invalido para '+field]);
}
util.inherits(InvalidValue, ValidationError);

module.exports.ValidationError = ValidationError;
module.exports.RequiredField = RequiredField;
module.exports.FieldsMismatch = FieldsMismatch;
module.exports.InvalidValue = InvalidValue;
module.exports.MongoErrors = function (code) {
  switch (code) {
    case 11000:
      //return 'unique field with duplicate value';
      return 'Campo único con valor duplicado ';
    default:
      return 'Error inesperado en el API';
  }
};

function validationPointCharter(name) {
  let num = 0;
  for (let value of Array.from(name)) {
    if (value === ".") {
      num++
    }
  }
  return num
}
module.exports.validationPointCharter = validationPointCharter;
