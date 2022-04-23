const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const Doctor = require('./model/doctor');
const Patient = require('./model/patient');
const Admin = require('./model/admin');
const Token = require('./model/Token');
const verify = require('./routes/verify');
const resend = require('./routes/resend');
const routes = require ('./routes/index');
const path = require('path');
require('dotenv').config(); 
require("./config/db");

const app = express();  
app.use(cors());
//express body parser
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', './layout/main');

app.use(routes)


const PORT = process.env.PORT || 5000

app.set("port", PORT)

app.listen(PORT, () => {
  console.log("Listening to " + PORT);
});

