var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var doctorSchema = new Schema({
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

doctorSchema.pre('save', function (next) {
    var doctor = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(doctor.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                doctor.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

doctorSchema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

Model = mongoose.model('Doctor', doctorSchema);
module.exports = {
    fetchData: function(callback) {
      data = Model.find({});
      data.exec(function(err , data){
        if(err) throw err;
        return callback(data);
      })
    }
    
  }
