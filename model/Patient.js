var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var patientSchema = new Schema({
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
    }
})

patientSchema.pre('save', function (next) {
    var patient = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(patient.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                patient.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

patientSchema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

patientSchema.fetchData = function(callback) {
    data = Model.find({});
    data.exec(function(err , data){
      if(err) throw err;
      return callback(data);
    })
}

module.exports = mongoose.model('Patient', patientSchema); 
