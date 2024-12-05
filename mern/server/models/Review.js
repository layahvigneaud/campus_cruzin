const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    major: { type: String, required: true },
    position: String,
    application: String,
    offeredPosition: String,
    timeCommitment: String,
    description: String,
    overallRating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: {type: Number, default: 0}
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;