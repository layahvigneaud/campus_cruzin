const express = require('express');
const Club = require('../models/Club');
const router = express.Router();

// Route to get all clubs
router.get('/populate', async (req, res) => {
    try {
        const clubs = await Club.find(); 
        res.json(clubs);
        console.log(clubs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving clubs', error });
    }
});

module.exports = router;