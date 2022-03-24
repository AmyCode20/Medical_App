const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const Doctor = require('./model/Doctor');
const Patient = require('./model/Patient');
require('./services/doctorPassport');
require('./services/patientPassport');
const PORT = process.env.PORT || 5000
const app = express();

const dbURL = "mongodb+srv://Users:here1234@cluster0.mmuvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    app.listen(PORT, () => console.log(`Server is connected at port ${PORT}`));
})

