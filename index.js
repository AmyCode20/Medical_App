const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const Doctor = require('./model/Doctor');
const Patient = require('./model/Patient');
const Token = require('./model/Token');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const login = require('./routes/login')
const verify = require('./routes/verify');
const resend = require('./routes/resend')
require('./services/doctorPassport');
require('./services/patientPassport');
require('dotenv').config();
require("./config/db");

const app = express();  
app.use(cors());
//express body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKEY_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/routes/doctorRoutes", doctorRoutes);
app.use("/routes/patientRoutes", patientRoutes);
app.use("/routes/login", login)



app.get("/", async (req, res) => {
  res.send("index");
});

const PORT = process.env.PORT || 5000

app.set("port", PORT)

app.listen(PORT, () => {
  console.log("Listening to " + PORT);
});

