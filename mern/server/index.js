const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/User')
const PORT = process.env.PORT || 3001
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_USER_URL);

app.post('/login', (req, res) => {
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
            res.json("No record exists!")
        }
    })
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});