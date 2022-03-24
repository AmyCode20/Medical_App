const mongoose = require('mongoose');
const schema = mongoose.Schema();

const DoctorSchema = new mongoose.Schema(
  {
  googleId: String,
  name: {type: String, required: true, minlength: 3, maxlength: 50},
  email: {type: String, required: true, minlength: 5, maxlength: 255, unique: true},
  date : { type : Date, default: Date.now},
  isVerified: {type: Boolean, default: false},
  subscription: {type: Boolean, default: false},
  chat: {type: Boolean, default: false},
  audioCall: {type: Boolean, default: false},
  videoCall: {type: Boolean, default:false},
  newPassword: {type: String, required: true, minlength: 5, maxlength: 1024},

},
  {collection: 'doctors'}
);

const Model = mongoose.model('Doctor', DoctorSchema);
module.exports = Model;