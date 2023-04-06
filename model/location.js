const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  userId:{
    type:String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
address:{
    type: String,
    required: true,
},
image:{
  type: String,
  
},
 resourceType: {
    type: String
  
  },
 
  
}, { timestamps: true });

const Locations = mongoose.model('location', locationSchema);
module.exports = Locations;