import React, { useState } from 'react';
import SaveButton from './SaveButton';
import Rating from './Rating';
import '../styles/ClubInfoCard.css';

function ClubInfoCard({title, description, tags, moreinfo}) {
    if(moreinfo === "") {
        moreinfo = "No additional information available."
    }
    const infoLines = moreinfo.split('\n');
    return (
        <div className="club-info-card-container">
            <SaveButton/>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <Rating className="rating"/>
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
                    <strong>Most common major:</strong> Computer Science
                    <br/>
                    
                    <strong>Time commitment:</strong> &lt;5 hours/week
                    <br/>
                    
                    <strong>Application Required?:</strong> No
                    <br/>
                </p>
            </div>
        </div>
    )
}

export default ClubInfoCard