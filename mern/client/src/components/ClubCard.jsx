import React from 'react';
import { Link } from "react-router-dom";

function ClubCard({title, description}) {
    return (
        <div className="club-card">
            <div className="information">
                <Link to="/searchclubs">
                    <button type="button">{title}</button>
                </Link>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default ClubCard;
