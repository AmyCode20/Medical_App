const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        minlength: 5, maxlength: 255, unique: true
    },
    password: {
        type: String,
        require: true
    },
    emailToken: {type: String},
    isVerified: {type: Boolean },
    isAdmin: {type: Boolean},
    date: {type: Date, default:Date.now()},
})

module.exports = mongoose.model('Admin', adminSchema);