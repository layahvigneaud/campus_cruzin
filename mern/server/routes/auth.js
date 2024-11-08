const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (user) {
        return res.json({message: "user already exists"});
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username,
        email,
        password: hashpassword,
    });

    await newUser.save();
    return res.json({status: true, message: "record registered"});
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (!user) {
        return res.json({message: "user is not registered"});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({message: "password is incorrect"});
    }

    // generate token and store inside user's cookies
    // httpOnly specifies that cookie can only be accessed from the JavaScript
    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1h'});
    res.cookie('token', token, {httpOnly: true, maxAge: 360000});
    return res.json({status: true, message: "login successful"});
});

router.post('/forgotpassword', async(req, res) => {
    const {email} = req.body;

    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.json({message: "email not found!"});
        }

        const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: '5m'});

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'campuscruisinn@gmail.com',
            pass: process.env.GMAIL_PASS
        }
        });

        var mailOptions = {
        from: 'campuscruisinn@gmail.com',
        to: email,
        subject: 'Campus Cruisin: Reset Password',
        text: `http://localhost:5173/resetpassword/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.json({ message: "error sending email"});
        } else {
            return res.json({ status: true, message: "email sent"});
        }
        }); 
    } catch (err) {
        console.log(err);
    }
})

router.post('/resetpassword/:token', async(req, res) => {
    const token = req.params.token;
    const {password} = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate({_id: id}, {password: hashPassword});
        return res.json({status: true, message: "updated password"});
    } catch (err) {
        return res.json("invalid token");
    }
})

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.json({status: false, message: "no token"});
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next();
    } catch (err) {
        console.error("Error in axios request: ", err);
        return res.json(err);
    }
}

router.get('/verify', verifyUser, (req, res) => {
    return res.json({status: true, message: "authorized"});
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({status: true});
})

module.exports = router;