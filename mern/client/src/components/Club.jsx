import Navbar from './Navbar';
import React, { useState } from 'react';
import SaveButton from './SaveButton';
import Rating from './Rating';
import ReviewCard from './ReviewCard';
import ClubInfoCard from './ClubInfoCard';
import '../styles/Club.css';

function Club() {
    const [filterRating, setFilterRating] = useState('');

    const handleChangeFilter = event => {
        setFilterRating(event.target.value);
    }

    return (
        <div>
            <Navbar/>
            <div className="content-container">
                <div>
                    <ClubInfoCard/>
                </div>
                <div className="review-container">
                    <h3>Reviews</h3>
                    <div className="review-nav-bar">
                        <select
                            name="rating-filter"
                            value={filterRating}
                            onChange={handleChangeFilter}
                            id="rating-filter"
                        >
                            <option value="5.0">5.0 stars</option>
                            <option value="4.5">4.5 stars</option>
                            <option value="4.0">4.0 stars</option>
                            <option value="3.5">3.5 stars</option>
                            <option value="3.0">3.0 stars</option>
                            <option value="2.5">2.5 stars</option>
                            <option value="2.0">2.0 stars</option>
                            <option value="1.5">1.5 stars</option>
                            <option value="1.0">1.0 stars</option>
                            <option value="0.5">0.5 stars</option>
                            <option value="0.0">0.0 stars</option>
                        </select>
                        <button className="review-submit-button">Submit a Review!</button>
                    </div>
                    <div>
                        <ReviewCard/>
                        <ReviewCard/>
                        <ReviewCard/>
                        <ReviewCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Club