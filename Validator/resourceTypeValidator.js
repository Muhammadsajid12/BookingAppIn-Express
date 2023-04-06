const Joi = require('joi');
const Validator=(schema)=>(payload)=> schema.validate(payload,{abortEarly:false})

// Joi schema....
const rsourceTypeSchema= Joi.object({
name:Joi.string().required(),
resource:Joi.string().required(),
location:Joi.string().required()
})

exports.validateResourceType=Validator(rsourceTypeSchema)