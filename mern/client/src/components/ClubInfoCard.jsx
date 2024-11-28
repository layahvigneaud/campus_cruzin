import React, { useState } from 'react';
import SaveClubButton from './SaveClubButton';
import Rating from './Rating';
import '../styles/ClubInfoCard.css';

function ClubInfoCard({title, description, tags, major, rating, time, application, moreinfo, isSaved, club_id}) {
    if(moreinfo === "") {
        moreinfo = "No additional information available."
    }
    const infoLines = moreinfo.split('\n');
    return (
        <div className="club-info-card-container">
            <SaveClubButton saveState={isSaved} clubId={club_id}/>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <Rating 
                    className="rating"
                    value={rating}
                />
            </div>
            <div>
                <p>
                    <strong>More Info:</strong> {infoLines.map((line, index) => (
                        <span key={index}>{line}<br/></span>
                    ))}
                </p>

                <p id="club-info-card-descriptors">
                    <strong>Tags: </strong>
                    {tags.map((tag, index) => (
                        <span key={index}>{tag}{index < tags.length - 1 && ', '}</span>
                    ))}
                    <br/>
                    <strong>Most common major:</strong> {major}
                    <br/>
                    
                    <strong>Time commitment:</strong> ~{time} hours/week
                    <br/>
                    
                    <strong>Application Required?:</strong> {application}
                    <br/>
                </p>
            </div>
        </div>
    )
}

export default ClubInfoCard