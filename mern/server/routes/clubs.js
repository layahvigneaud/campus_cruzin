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

// Route to get a single club by ID
router.get('/:clubId', async (req, res) => {
    const { clubId } = req.params;
    try {
        const club = await Club.findById(clubId);
        res.json(club);
    } catch (error) {
        console.error('Error fetching club by ID:', error);
        res.status(500).json({ message: 'Error fetching club', error });
    }
});

// New route to filter clubs by tags
router.post('/filter', async (req, res) => {
    const { tags } = req.body;
    try {
        // Find clubs that have at least one matching tag
        const clubs = await Club.find({ tags: { $in: tags } });
        res.json(clubs);
    } catch (error) {
        console.error('Error fetching filtered clubs:', error);
        res.status(500).json({ message: 'Error filtering clubs', error });
    }
});


module.exports = router;


router.get('/search', async (req, res) => {
    const query = req.query.q || '';
    try {
        const clubs = await Club.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search
        res.json(clubs);
    } catch (error) {
        console.error('Error searching clubs:', error);
        res.status(500).json({ message: 'Error searching clubs', error });
    }
});