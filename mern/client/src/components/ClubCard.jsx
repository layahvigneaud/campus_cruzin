import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import SaveButton from './SaveButton';
import Rating from './Rating';
import axios from 'axios';
import '../styles/ClubCard.css';

function ClubCard({title, description, club_id}) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log('Fetching reviews for club with ID:', club_id);
                const response = await axios.get(`http://localhost:3001/reviews/${club_id}`);
                setReviews(response.data);
                console.log('Reviews:', response.data);
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

    return (
        <div className="club-card-container">
            <div className="club-card-information">
                    <div className="club-card-row">
                        <Link to={`/club/${club_id}`}>
                            <h3>{title}</h3>
                        </Link>
                        <SaveButton/>
                    </div>
                <p>{description}</p>
            </div>
            <Rating value={overallRating}/>
        </div>
    );
}

export default ClubCard;
