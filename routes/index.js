const express = require('express');
const doctorAuth = require('../method/doctorAuth');
const patientAuth = require('../method/patientAuth');
const {userLogin, verifyEmail} = require('../config/token');

const router = express.Router();
const {indexView, patientListView, doctorListView, pageLoginView, pageError400View, pageRegisterView, appProfileView} = require('../controllers/indexController');




//@desc Adding new doctor
//@route POST /doctorRoutes
router.post('/doctorRoutes', doctorAuth.doctorRoutes);

//@desc doctor's login
//@route POST /doctorLogin
router.post('/doctorLogin', doctorAuth.doctorLogin);

//@desc Adding new patient
//@route POST /patientRoutes
router.post('/patientRoutes', patientAuth.patientRoutes);

//@desc patient's login
//@route POST /patientLogin
router.post('/patientLogin', patientAuth.patientLogin);


//@desc UI view page
router.get('/', pageRegisterView);
router.post('/register', pageRegisterView);
router.get('/login', pageLoginView);
router.post('/page-login', verifyEmail, pageLoginView);
router.get('/index', userLogin, indexView);
router.get('/patient-list', patientListView);
router.get('/doctor-list', doctorListView);
router.get('/page-error-400', pageError400View);
router.get('/app-profile', appProfileView);


module.exports = router