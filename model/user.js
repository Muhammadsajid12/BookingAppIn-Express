const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userrSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

const User = mongoose.model('user', userrSchema);
module.exports = User;