import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import '../styles/ReviewCard.css';
import LikeIcon from '../assets/like.svg';
import DislikeIcon from '../assets/dislike.svg';

function ReviewCard({description, major, application, time, position, rating, date}) {
    const [likes, setLikes] = useState(10);
    const [dislikes, setDislikes] = useState(0);

    function handleClick(ratingType) {
        if(ratingType === "like") {
        }
        else{
        }
        {/* like or dislike and update database accordingly*/}
    }

    return (
        <div>
            <div className="reviewcard-container">
                <div className="reviewcard-header">
                    <h3>posted on: {date.substring(0, 10)}</h3>
                    <Rating value={rating.toFixed(1)}/>
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
                        Position: {position !== "" ? position : "N/A"}
                    </p>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button onClick={handleClick("like")} className="reviewcard-rate-button">
                            <img src={LikeIcon}/>
                            {likes} {/* number of likes -> update based on database*/}
                        </button>
                        <button onClick={handleClick("like")} className="reviewcard-rate-button">
                            <img src={DislikeIcon}/>
                            {dislikes} {/* number of dislikes -> populate based on database*/}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard