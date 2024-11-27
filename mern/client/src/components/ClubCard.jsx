import React from 'react';
import { Link } from "react-router-dom";
import SaveButton from './SaveButton';
import Rating from './Rating';
import '../styles/ClubCard.css';

function ClubCard({title, description, club_id}) {
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
                <Rating/>
            </div>
        </div>
    );
}

export default ClubCard;
