const Token = require("../model/Token");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Doctor = require('../model/doctor');
const Patient = require('../model/patient');
const mongoose = require('mongoose');
const express = require('express');
const router = express();

router.post('/resend/doctor', async (req, res) => {
  const errors = req.validationErrors();
  if (errors) return res.status(400).send(error);

  Doctor.findOne({email: req.body.email}, function (err, doctor) {
    if (!doctor) return res.status(400).send({ msg: 'Could not find doctor with that email.' });
    if (doctor.isVerified) return res.status(400).send({ msg: 'Account verified. Login.' });
    const token = new Token({ _doctorId: doctor._id, token: crypto.randomBytes(16).toString('hex') });

    token.save(function (err) {
      if(err) { return res.status(400).send({ msg: err.message }); }
      const transporter = nodemailer.createTransport({ 
        service: 'gmail', auth: { user: process.env.AUTH_EMAIL, pass: process.env.AUTH_PASS } });
      const mailOptions = { from: process.env.AUTH_EMAIL, to: doctor.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
      transport.sendMail(mailOptions, function (err) {
        if (err) { return res.status(400).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + doctor.email + '.');
      });
    });
  });
});

router.post('/resend/patient', async (req, res) => {
  const errors = req.validationErrors();
  if (errors) return res.status(400).send(error);

  Patient.findOne({email: req.body.email}, function (err, user) {
    if (!patient) return res.status(400).send({ msg: 'Could not find patient with that email.' });
    if (patient.isVerified) return res.status(400).send({ msg: 'Account verified. log in.' });
    const token = new Token({ _patientId: patient._id, token: crypto.randomBytes(16).toString('hex') });

    token.save(function (err) {
      if(err) { return res.status(400).send({ msg: err.message }); }
      const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.AUTH_EMAIL, pass: process.env.AUTH_PASS } });
      const mailOptions = { from: process.env.AUTH_EMAIL, to: patient.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
      transport.sendMail(mailOptions, function (err) {
        if (err) { return res.status(400).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + patient.email + '.');
      });
    });
  });
});

module.exports = router;
