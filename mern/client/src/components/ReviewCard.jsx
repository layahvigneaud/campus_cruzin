import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import '../styles/ReviewCard.css';
import SaveReviewButton from './SaveReviewButton';

function ReviewCard({description, major, application, time, position, rating, date, review_id, isSaved}) {
    if (!review_id) {
        return (
            <h1>Review ID not provided!</h1>
        )
    }
    return (
        <div>
            <div className="reviewcard-container">
            <div className="reviewcard-header">
                <Rating value={rating.toFixed(1)} />
                <div className="reviewcard-date-save">
                    <h3>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                    <SaveReviewButton saveState={isSaved} reviewId={review_id} />
                </div>
            </div>
                <div className="reviewcard-content">
                    <p className="reviewcard-contents">
                        {description}
                    </p>
                    <p className="reviewcard-demographics">
                        <p id="rbold">
                        <strong>Major: </strong>{major}
                        <br/>
                        <strong>Application Required? </strong> {application}
                        <br/>
                        <strong> Time commitment: </strong> {time} hour{time === '1' ? '' : 's'}/week
                        <br/>
                        <strong>Position: </strong> {position !== "" ? position : "N/A"}
                        </p>
                    </p>
                    
                </div>
            </div>
        </div>
    );
}

export default ReviewCard