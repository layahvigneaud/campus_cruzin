const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth'); 
const clubRoutes = require('./routes/clubs'); 
require("dotenv").config();

const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true, 
};
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/auth', authRoutes);
app.use('/clubs', clubRoutes);

mongoose.connect(process.env.MONGODB_USER_URL);
app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`);
});