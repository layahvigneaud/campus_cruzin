import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import '../styles/ReviewCard.css';
import LikeIcon from '../assets/like.svg';
import DislikeIcon from '../assets/dislike.svg';
import SaveReviewButton from './SaveReviewButton';

function ReviewCard({description, major, application, time, position, rating, date, review_id, isSaved}) {
    return (
        <div>
            <div className="reviewcard-container">
                <div className="reviewcard-header">
                    <h3>posted on: {date.substring(0, 10)}</h3>
                    <SaveReviewButton saveState={isSaved} reviewId={review_id}/>
                </div>
                <div className="reviewcard-content">
                    <p className="reviewcard-contents">
                        {description}
                    </p>
                    <p className="reviewcard-demographics">
                        Major: {major}
                        <br/>
                        Application Required? {application}
                        <br/>
                        Time commitment: {time} hour{time === '1' ? '' : 's'}/week
                        <br/>
                        Position: {position}
                    </p>
                    <Rating value={rating.toFixed(1)}/>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard