const express = require('express');
const alllDoctors = require('../model/doctor');
const allPatients = require('../model/patient');
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const cookie = require('cookie-parser');
const router = express.Router();



const pageRegisterView = async (req, res, next) => {
    res.render('page-register', {layout: 'page-register'});

    try {
        const {name, email, password} = req.body

        const newAdmin = await new Admin({
            
            name,
            email,
            password,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false
        });
        await newAdmin.save(); 
        
        
        // const mailOptions = {
        //     from: ' "Verify your email" <process.env.AUTH_EMAIL>',
        //     to: admin.email,
        //     subject: 'Health Care -verify your email',
        //     html: `<h3> ${admin.name}! Thanks for registrating</h3>
        //     <h4> Please verify your mail </h4>
        //     <a href="http://${req.headers.host}/Admin/verify-email?token=${admin.emailToken}"> Verify Your Email Account </a> `
        // }

        // transporter.sendMail(mailOptions, function(error, info) {
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         console.log('Verification email is sent to your gmail account');
        //     }
        // })

        res.redirect('page-login')
    } catch (err) {
        console.log(err)
    }
}
router.get('/verify-email', async(req, res) =>{
    try {
        const token = req.query.token;
        const Admin = await Admin.findOne({emailToken: token});
        if (Admin) {
            Admin.emailToken = null;
            Admin.isVerified = true;
            await Admin.save();
            res.redirect('page-login');
        }
        else {
            res.redirect('page-register');
            console.log('email is not verified');
        }
    } catch (error) {
        
    }
})

const createToken = (id)=>{
    return jwt.sign({id}, "jwtPrivateKey");
}


const indexView = (req, res, next) => {
    res.render('index');                
}

const patientListView = function (req, res, next)  {
    allPatients.fetchData(function(data) {
        res.render('patient-list', {data:data});
    })
}

const doctorListView = function (req, res, next)  {
    alllDoctors.fetchData(function(data) {
        res.render('doctor-list', {data:data});
    })
}

const pageLoginView = async (req, res, next) => {
    res.render('page-login', {layout: 'page-login' });

    try {
        const {email, password} = req.body
        const findAdmin = await Admin.findOne({email : email});
        if (findAdmin) {
            const match = await bcrypt.compare(password, findAdmin.password);
            if (match) {
                const token = createToken(findAdmin.id);
                console.log(token);
                res.cookie('access-token', token);
                res.redirect('index');
            }
            else {
                console.log('Invalid Password');
            }
        }
        else {
            console.log('Registration Failed');
        }
    } catch (error) {
        console.log(error);
    }

    res.send("Login-page")
}

const pageError400View = (req, res, next) => {
    res.render('page-error-400');
}

const appProfileView = (req, res, next) => {
    res.render('app-profile');
}


module.exports = {
    indexView,
    patientListView,
    doctorListView,
    pageRegisterView,
    pageLoginView,
    pageError400View,
    appProfileView
}

