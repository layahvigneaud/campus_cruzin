import React, { useEffect, useState } from 'react';
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
            <div className="card-container">
                <h3>posted on: {date.substring(0, 10)}</h3>
                <p className="review-contents">
                    {description}
                </p>
                <p className="demographics">
                    Major: {major}
                    <br/>
                    Application Required? {application}
                    <br/>
                    Time commitment: {time} hour{time === '1' ? '' : 's'}/week
                    <br/>
                    Position: {position}
                </p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button onClick={handleClick("like")} className="rate-button">
                        <img src={LikeIcon}/>
                        {likes} {/* number of likes -> update based on database*/}
                    </button>
                    <button onClick={handleClick("like")} className="rate-button">
                        <img src={DislikeIcon}/>
                        {dislikes} {/* number of dislikes -> populate based on database*/}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard