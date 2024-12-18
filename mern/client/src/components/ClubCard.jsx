import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SaveClubButton from './SaveClubButton';
import Rating from './Rating';
import axios from 'axios';
import '../styles/ClubCard.css';

function ClubCard({title, description, club_id, isSaved}) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/reviews/${club_id}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [club_id]);

    let overallRating = 0;
    let length = reviews.length;

    for(let i = 0; i < length; i++) {
        overallRating += reviews[i].overallRating;
    }

    overallRating = length != 0 ? ((overallRating/length).toFixed(1)) : overallRating.toFixed(1);

    if (!club_id)
    {
        return (
            <h1>Club ID not provided!</h1>
        );
    }

    return (
        <div className="club-card-container">
            <div className="club-card-information">
                    <div className="club-card-row">
                        <Link to={`/club/${club_id}`}>
                            <h3>{title}</h3>
                        </Link>
                        <SaveClubButton saveState={isSaved} clubId={club_id}/>
                    </div>
                <p>{description}</p>
            </div>
            <Rating value={overallRating}/>
        </div>
    );
}

export default ClubCard;
