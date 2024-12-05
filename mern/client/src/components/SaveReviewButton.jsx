import React, { useState, useEffect } from 'react';
import UnsavedIcon from '../assets/emptyheart.svg';
import SavedIcon from '../assets/filledheart.svg';
import axios from 'axios';
import '../styles/SaveReviewButton.css';

function SaveReviewButton({ saveState, reviewId }) {
    const [saved, setSaved] = useState(saveState); /* set to true based on get request from database */
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                console.log('Fetching review with ID:', reviewId);
                const fetched_review = await axios.get(`http://localhost:3001/reviews/getReview/${reviewId}`);
                setLikes(fetched_review.data.likes);
                console.log('Review:', fetched_review.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReview();
    }, [reviewId]);

    const handleClick = async () => {
        const newSaveState = !saved;
        
        try {
            const updatedLikes = newSaveState ? likes + 1 : likes - 1;
            setLikes(updatedLikes); 

            if (newSaveState)
            {
                axios.post('http://localhost:3001/auth/saveReview', { reviewId });
                console.log("Review successfully saved!")
            }
            else 
            {
                axios.post('http://localhost:3001/auth/unsaveReview', { reviewId });
                console.log("Review successfully unsaved!")
            }
            setSaved(newSaveState);   
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="save-review">
            <button onClick={ handleClick } className="save-review-button">
                {/* save icon based on save status */}
                <img src={saved ? SavedIcon : UnsavedIcon}/>
            </button>
            <p className="save-review-likes">{likes}</p>
        </div>
    );
}

export default SaveReviewButton;