const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Registration = require("../model/Doctor");
const Registration = require("../model/Patient");
require('../services/doctorPassport');
require('../services/patientPassport');
const bcrypt = require("bcrypt");
const express = require("express");
const router = express();

// @desc    Forgot password link
// @route   POST /api/login
router.post("/", async (req, res) => {
  const { error } = req.body;
  const { email, password } = req.body;
  console.log("doctor");

  if (email || password) {
    console.log(email, password);
    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      const validpassword = await bcrypt.compare(password, doctor.newPassword);

      console.log(validpassword);

      if (validpassword) {
        const token = jwt.sign({ _id: doctor.email }, "jwtPrivateKey");
        res.send({
          doctor,
          token,
        });
      } else {
        return res.json({ error: "Invalid Password" });
      }
    } else {
      return res.json({ error: "we don't have this email in our database" });
    }
  } else {
    return res.json({ error: "fill the form" });
  }
});

// @desc    Forgot password link
// @route   POST /api/login
router.post("/", async (req, res) => {
  const { error } = req.body;
  const { email, password } = req.body;
  console.log("patient");

  if (email || password) {
    console.log(email, password);
    const patient = await Patient.findOne({ email });
    if (patient) {
      const validpassword = await bcrypt.compare(password, user.newPassword);

      console.log(validpassword);

      if (validpassword) {
        const token = jwt.sign({ _id: patient.email }, "jwtPrivateKey");
        res.send({
          patient,
          token,
        });
      } else {
        return res.json({ error: "Invalid Password" });
      }
    } else {
      return res.json({ error: "we don't have this email in our database" });
    }
  } else {
    return res.json({ error: "fill the form" });
  }
});

module.exports = router;

