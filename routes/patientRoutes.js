const _ = require('lodash');
const passport = require('passport');
const Registration = require('../model/Patient');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
require('../services/patientPassport');
const router = express();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get('/api/current_user', (req, res) => {
  res.send(req.session);
  res.send(req.user);
});


router.post('/routes/patientRoutes', async (req, res) => {
  const { error } = req.body;
  const { name, email, date, subscription, chat, audioCall, videoCall, password, repeatPassword } = req.body;

  if (name || email || date || subscription || chat || audioCall || videoCall || isAdmin || password || repeatPassword) {
    console.log(name, email, password)
    if (error) return res.status(400).send(error);

    const checkEmail = await Patient.findOne({ email });
    if (checkEmail) return res.status(400).send('Email already exist.');

    const subscription = false;
    const chat = false;
    const audioCall = false;
    const videoCall = false;
    isAdmin = false;

    if (password === repeatPassword) { 
      async function run() {
        const Salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, Salt);
        
      } 
      
      const newPatient = new Patient({ name, email, date, subscription, chat, audioCall, videoCall, isAdmin, newPassword });
      await newPatient.save();

      res.send(_.pick(newPatient, ['_id', 'name', 'time', 'email', 'subscription', 'chat', 'audioCall', 'videoCall', 'isAdmin']));
    } else {
      return res.status(200).send('Password must be the same');
    };
    
  } else {
    error.push('fill all details')
    return res.status(200).send(error);
  

  };
})

module.exports = router;

