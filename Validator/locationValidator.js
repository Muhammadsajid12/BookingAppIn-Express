const Joi = require('joi');
const Validator=(schema)=>(payload)=> schema.validate(payload,{abortEarly:false})

// Joi schema....
const locationSchema= Joi.object({
name:Joi.string().required(),
address:Joi.string().required(),
resourceType:Joi.string().required()
})

exports.validateLocation=Validator(locationSchema)