import React, { useEffect, useState } from 'react';
import '../styles/ReviewCard.css';
import LikeIcon from '../assets/like.svg';
import DislikeIcon from '../assets/dislike.svg';

function ReviewCard() {
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
                <h1>username</h1>
                <p className="review-contents">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
                </p>
                <p className="demographics">
                    Major: Computer Science
                    <br/>
                    Application Required? No
                    <br/>
                    Time commitment: 1 hour/week
                    <br/>
                    Position: Frontend Developer
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