const Patient = require('../model/patient')
const jwt = require('jsonwebtoken')

const functions = {
    patientRoutes: function (req, res) {
        const { name, email, date, subscription, chat, audioCall, videoCall, password} = req.body;

        if (name || email || date || subscription || chat || audioCall || videoCall || password) {
            const newPatient = Patient({
                name,
                email,
                password,
                subscription: false,
                chat: false,
                audioCall: false,
                videoCall: false

            });
            newPatient.save(function (err, newDoctor) {
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
    patientLogin: function (req, res) {
        const { email, password } = req.body;
        patient.findOne({
            name: req.body.email
        }, function (err, patient) {
                if (err) throw err
                if (!doctor) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }

                else {
                    doctor.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                           // var token = jwt.encode(doctor, "jwtPrivateKey")
                            const token = jwt.sign({ _id: patient.email }, "jwtPrivateKey");
                            //res.json({success: true, token: token})
                            res.send({
                                patient,
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