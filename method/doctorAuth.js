const Doctor = require('../model/doctor');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const functions = {
    doctorRoutes: function (req, res) {
        const {name, email, password} = req.body
        if ( (name.req.body) || (email.req.body)|| (password.req.body)) {
            const newDoctor = Doctor({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                subscription: false,
                chat: false,
                audioCall: false,
                videoCall: false

            });
            newDoctor.save(function (err, newDoctor) {
                if (err) {
                    res.json({success: false, msg: 'Registration failed'})
                }
                else {
                    res.json({success: true, msg: 'Registration Successful'})
                }
            })
        }
        else {
            res.json({success: false, msg: 'Enter all fields'})
        }
    },
    doctorLogin: function (req, res) {
        const { email, password } = req.body;
        Doctor.findOne({
            name: req.body.email
        }, function (err, doctor) {
                if (err) throw err
                if (!doctor) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }

                else {
                    doctor.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            const token = jwt.sign({ _id: doctor.email }, "jwtPrivateKey");
                            res.send({
                                doctor,
                                token,
                              });
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Failed to login, wrong password'})
                        }
                    })
                }
        }
        )
    },

}

module.exports = functions