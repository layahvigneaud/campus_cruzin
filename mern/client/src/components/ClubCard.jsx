import React from 'react';
import { Link } from "react-router-dom";

function ClubCard({title, description, club_id}) {
    return (
        <div className="club-card">
            <div className="information">
                <Link to={`/${club_id}`}>
                    <h3>{title}</h3>
                </Link>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default ClubCard;
