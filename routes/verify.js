const Token = require("../model/Token");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const express = require('express');
const router = express();

router.post('/verify/doctor', async (req, res) => {
  const errors = req.validationErrors();
  if (errors) return res.status(400).send(errors);

  Token.findOne({ token: req.body.token }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'Unable to find your token.' });

    Doctor.findOne({ _id: token._doctorId, email: req.body.email }, function (err, doctor) {
      if (!doctor) return res.status(400).send({ msg: 'Unable to find doctors token.' });
      if (doctor.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This doctor has already been verified.' });

      doctor.isVerified = true;
      doctor.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send("This account has been verified. Please log in.");
      });
    });
  });
});

router.post('/verify/patient', async (req, res) => {
    const errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);
  
    Token.findOne({ token: req.body.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'Unable to find your token.' });
  
      patient.findOne({ _id: token._patientId, email: req.body.email }, function (err, patient) {
        if (!patient) return res.status(400).send({ msg: 'Unable to find doctors token.' });
        if (patient.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This patient has already been verified.' });
  
        patient.isVerified = true;
        patient.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          res.status(200).send("This account has been verified. Please log in.");
      });
    });
  });
});


module.exports = router;