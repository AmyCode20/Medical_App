const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Registration = require('../model/Doctor');
require('dotenv').config();

const Doctor = mongoose.model('Doctor');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Doctor.findById(id).then(doctor => {
    done(null, doctor);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },

    async (accessToken, refreshToken, profile, done) => {
      const existingDoctor = await doctor.findOne({ googleId: profile.id })
      if (existingDoctor) {
          //we already have a record with the given profile ID
        done(null, existingDoctor);
      } else {
        //we don't have a user record with this ID, make a new record!
        const doctor = await new Doctor({ googleId: profile.id }).save()
        done(null, doctor);
      }
    

    }
  )
);

