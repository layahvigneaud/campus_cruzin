const express = require('express');
const Review = require('../models/Review');
const Club = require('../models/Club'); // For validating club existence
const router = express.Router();

// Route to create a review
router.post('/addReview', async (req, res) => {
    const { club, major, position, application, offeredPosition, timeCommitment, description, overallRating } = req.body;
    console.log('Received data:', req.body);
    try {
        // Ensure the club exists
        console.log('Validating club with ID:', club);
        const existingClub = await Club.findById(club);
        if (!existingClub) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Create and save the review
        const review = new Review({ club, major, position, application, offeredPosition, timeCommitment, description, overallRating });
        await review.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.log('Error adding review:', error);
        res.status(500).json({ message: 'Error adding review', error });
    }
});

// Route to get reviews for a specific club
router.get('/:clubId', async (req, res) => {
    const { clubId } = req.params;

    try {
        const reviews = await Review.find({ club: clubId }).populate('club', 'name description');
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
});

module.exports = router;
