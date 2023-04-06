const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceTypeSchema = new Schema({
  userId:{
    type:String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },

  resource: {
    type: String,
    required: true,
  },
  
location:{
    type: String,
    required: true,
}

  
  
 
  
}, { timestamps: true });

const ResourceType = mongoose.model('resourceType', resourceTypeSchema);
module.exports = ResourceType;