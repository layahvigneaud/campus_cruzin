const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth'); 
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

mongoose.connect(process.env.MONGODB_USER_URL);

app.use('/auth', authRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`);
});