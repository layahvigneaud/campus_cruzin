import React, { useState } from 'react';
import UnsavedIcon from '../assets/emptyheart.svg';
import SavedIcon from '../assets/filledheart.svg';
import axios from 'axios';
import '../styles/SaveReviewButton.css';

function SaveReviewButton({ saveState, reviewId }) {
    const [saved, setSaved] = useState(saveState); /* set to true based on get request from database */
    const handleClick = () => {
        const newSaveState = !saved;
        try {
            if (newSaveState)
            {
                axios.post('http://localhost:3001/auth/saveReview', { 
                    reviewId 
                }).then(response => {
                    if (response.data.status)
                        console.log("Review successfully saved!");
                    else
                        console.log("Something went wrong!");
                }).catch(err => {
                    console.log(err);
                });
            }
            else 
            {
                axios.post('http://localhost:3001/auth/unsaveReview', {
                    reviewId
                }).then(response => {
                    if (response.data.status)
                        console.log("Review successfully saved!");
                    else 
                        console.log("Something went wrong!");
                }).catch(err => {
                    console.log(err);
                });
            }
            setSaved(newSaveState);        
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button onClick={ handleClick } className="save-review-button">
            {/* save icon based on save status */}
            <img src={saved ? SavedIcon : UnsavedIcon}/>
        </button>
    );
}

export default SaveReviewButton;