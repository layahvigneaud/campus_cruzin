const express = require('express');
const UserModel = require('../models/User');
const router = express.Router();

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json('Success');
            }
            else 
            {
                res.json("The password is incorrect");
            }
        }
        else
        {
            res.json("No record exists!");
        }
    })
});

router.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

module.exports = router;