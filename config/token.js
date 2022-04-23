const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const Admin = require('../model/admin');


const userLogin = async( req, res, next) => {
    const token = req.cookies['access-token'];
    if(token) {
        const validateToken = await jwt.verify(token, "jwtPrivateKey");
        if (validateToken) {
            res.Admin = validateToken.id;
            next();
        }
        else{
            console.log('expired token');
            res.redirect('page-login');

        }
    }
    else{
        console.log('token not found');
        res.redirect('page-login');
    }
}


const verifyEmail = async (req, res, next) => {
    try {
        if(Admin.isVerified) {
            next()
        }
        else{
            console.log('Please check your email to verify your account');
        } 
    } catch (error) {
        conslole.log(error);
    }
}

module.exports = {userLogin, verifyEmail};