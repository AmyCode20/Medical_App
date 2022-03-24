const mongoose = require('mongoose');
const schema = mongoose.Schema();

const DoctorSchema = new mongoose.Schema(
  {
  date : { type : Date, default: Date.now},
  isVerified: {type: Boolean, default: false},
  subscription: {type: Boolean, default: false},
  chat: {type: Boolean, default: false},
  audioCall: {type: Boolean, default: false},
  videoCall: {type: Boolean, default:false},
  
},
  {collection: 'subscription'}
);

const Model = mongoose.model('Doctor', DoctorSchema);
module.exports = Model;