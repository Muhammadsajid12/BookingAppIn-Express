const Joi = require('joi');
const Validator=(schema)=>(payload)=> schema.validate(payload,{abortEarly:false})

// Joi schema....
const loginSchema= Joi.object({
email:Joi.string().email().required(),
password:Joi.string().min(3).max(10)
})

exports.validateLogin=Validator(loginSchema)