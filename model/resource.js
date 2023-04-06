const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  userId:{
    type:String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
resourceType:{
  type: String,
  required: true,
}

  
  
}, { timestamps: true });

const Resource = mongoose.model('resource', resourceSchema);
module.exports = Resource;