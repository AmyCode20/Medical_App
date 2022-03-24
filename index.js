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


const dbURL = "mongodb+srv://Users:here1234@cluster0.mmuvt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.error("Could not connect to MongoDB..."));

const app = express();  

app.use(express.json());
app.use(cors());

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



app.get("/", async (req, res) => {
  res.send("index");
});

app.set("port", PORT)

app.listen(PORT, () => {
  console.log("Listening to " + PORT);
});

