const Joi = require('joi');
const Validator=(schema)=>(payload)=> schema.validate(payload,{abortEarly:false})

// Joi schema....
const rsourceSchema= Joi.object({
name:Joi.string().required(),
resourceType:Joi.string().required(),

})

exports.validateResource=Validator(rsourceSchema)