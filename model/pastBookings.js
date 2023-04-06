const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pastBookingSchema = new Schema({
  userId:{
    type:String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
email:{
    type: String,
    required: true,
},
 
bookingStartTime:{
     type: String,
    required: true,
},
bookingEndTime:{
     type: String,
    required: true,
},
 date: {
    type: String,
    
    require:true

  },




 
  
}, { timestamps: true });

const UserPastBooking = mongoose.model('userPastBooking', pastBookingSchema);
module.exports = UserPastBooking;