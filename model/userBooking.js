const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBookingSchema = new Schema({
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
 
bookingStartTime:{ type : Date, default: Date.now },
bookingEndTime:{
     type: String,
    required: true,
},
 date: {
    type: String,
    
    require:true

  },
  resourceType:{
    type: String,
    required: true,
  }




 
  
}, { timestamps: true });

const UserBooking = mongoose.model('userBooking', userBookingSchema);
module.exports = UserBooking;