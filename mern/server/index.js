const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const authRoutes = require('./routes/auth'); 
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_USER_URL);

app.use('/auth', authRoutes);

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});