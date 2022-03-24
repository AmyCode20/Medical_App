const _ = require('lodash');
const passport = require('passport');
const Registration = require('../model/Doctor');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
require('../services/doctorPassport');
const router = express();

module.exports = (router) => {
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

  router.post('/', async (req, res) => {
    const { error } = req.body;
    const { name, email, date, subscription, chat, audioCall, videoCall, password, repeatPassword } = req.body;

    if (name || email || date || subscription || chat || audioCall || videoCall || password || repeatPassword) {
      console.log(name, email, password)
      if (error) return res.status(400).send(error);

      const checkEmail = await Doctor.findOne({ email });
      if (checkEmail) return res.status(400).send('Email already exist.');

      const subscription = false;
      const chat = false;
      const audioCall = false;
      const videoCall = false;

      if (password === repeatPassword) { 
        async function run() {
          const Salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(password, Salt);
          
        } 
        
        const newDoctor = new Doctor({ name, email, date, subscription, chat, audioCall, videoCall, newPassword });
        await newRegistration.save();

        res.send(_.pick(newDoctor, ['_id', 'name', 'time', 'email', 'subscription', 'chat', 'audioCall', 'videoCall',]));
      } else {
        return res.status(200).send('Password must be the same');
      };
      
    } else {
      error.push('fill all details')
      return res.status(200).send(error);

    };
  })
  
};
