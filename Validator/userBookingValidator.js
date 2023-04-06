const Joi = require('joi');
const Validator=(schema)=>(payload)=> schema.validate(payload,{abortEarly:false})

// Joi schema....
const userBookingSchema= Joi.object({
name:Joi.string().required(),
email:Joi.string().required(),
bookingEndTime:Joi.string().required(),
date:Joi.date(),
resourceType:Joi.string().required()
})

exports.validateUserBookings=Validator(userBookingSchema)