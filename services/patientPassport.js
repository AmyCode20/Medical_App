const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Registration = require('../model/Patient');

const Patient = mongoose.model('Patient');

passport.serializeUser((Patient, done) => {
  done(null, patient.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(patient => {
    done(null, patient);
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
      const existingPatient = await Patient.findOne({ googleId: profile.id })
      if (existingPatient) {
          //we already have a record with the given profile ID
        done(null, existingPatient);
      } else {
        //we don't have a user record with this ID, make a new record!
        const patient = await new Patient({ googleId: profile.id }).save()
        done(null, patient);
      }
    

    }
  )
);

