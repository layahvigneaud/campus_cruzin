const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const ReviewModel = require('../models/Review');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body;
    const user_email = await UserModel.findOne({email});
    const user_name = await UserModel.findOne({username});
    if (user_email) {
        return res.json({message: "user already exists"});
    }
    else if (user_name) {
        return res.json({message: "username is taken"});
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
    res.cookie('token', token, {httpOnly: true, maxAge: 3600000});
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
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS
        }
        });

        var mailOptions = {
        from: process.env.GMAIL,
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
        const user = await UserModel.findOne({username: decoded.username});

        if (!user)
            return res.json({status: false, message: "User not found"});

        req.user = user;
        next();
    } catch (err) {
        console.error("Error in axios request: ", err);
        return res.json(err);
    }
}

router.get('/verify', verifyUser, (req, res) => {
    return res.json({status: true, message: "authorized"});
})

router.get('/user', verifyUser, (req, res) => {
    return res.json({
        status: true, 
        user: req.user, 
        message: "User successfully found!"
    });
})


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({status: true});
})

router.post('/saveClub', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ error: 'Token not provided' });

        const decoded = await jwt.verify(token, process.env.KEY);
        const username = decoded.username;
        const { clubId } = req.body;

        const result = await UserModel.updateOne(
            { username },
            { $addToSet: { savedClubs: clubId } }
        );

        if (result.modifiedCount > 0)
            return res.json({ status: true, message: "Club successfully saved!"});
        else 
            return res.json({ status: false, message: "Something went wrong while saving clubs!"});
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: "Something went wrong while saving clubs!"});
    }
})

router.post('/unsaveClub', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ error: 'Token not provided' });

        const decoded = await jwt.verify(token, process.env.KEY);
        const username = decoded.username;
        const { clubId } = req.body;

        const result = await UserModel.updateOne(
            { username },
            { $pull: { savedClubs: clubId } }
        );

        if (result.modifiedCount > 0)
            return res.json({ status: true, message: "Club successfully unsaved!"});
        else 
            return res.json({ status: false, message: "Something went wrong while unsaving clubs!"});
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: "Something went wrong while unsaving clubs!"});    }
})

router.post('/saveReview', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ error: 'Token not provided' });

        const decoded = await jwt.verify(token, process.env.KEY);
        const username = decoded.username;
        const { reviewId } = req.body;

        const result = await UserModel.updateOne(
            { username },
            { $addToSet: { savedReviews: reviewId } }
        );

        if (result.modifiedCount > 0)
        {
            await ReviewModel.updateOne({ _id: reviewId }, { $inc: { likes: 1 } });
            return res.json({ status: true, message: "Review successfully saved!"});
        }
        else 
            return res.json({ status: false, message: "Something went wrong while saving review!"});
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: "Something went wrong while saving review!"});
    }
})

router.post('/unsaveReview', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ error: 'Token not provided' });

        const decoded = await jwt.verify(token, process.env.KEY);
        const username = decoded.username;
        const { reviewId } = req.body;

        const result = await UserModel.updateOne(
            { username },
            { $pull: { savedReviews: reviewId } }
        );

        if (result.modifiedCount > 0) {
            await ReviewModel.updateOne({ _id: reviewId }, { $inc: { likes: -1 } });
            return res.json({ status: true, message: "Review successfully unsaved!"});
        }
        else 
            return res.json({ status: false, message: "Something went wrong while unsaving review!"});
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: "Something went wrong while unsaving review!"});    }
})

module.exports = router;