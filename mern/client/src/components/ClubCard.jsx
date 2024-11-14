import React from 'react';

function ClubCard({ club }) {
    return (
        <div className="club-card">
            <div className="club-card-content">
                <h2>{club.name}</h2>
                <p>{club.description}</p>
            </div>
        </div>
    );
}