import React, { useState } from 'react';
import SaveButton from './SaveButton';
import Rating from './Rating';
import '../styles/ClubInfoCard.css';

function ClubInfoCard(){
    return (
        <div className="club-info-container">
            <SaveButton className="save-button"/>
            <div>
                <h1>ACM Teach LA</h1>
                <p>ACM Teach LA pairs UCLA students with schools in  Los Angeles to provide free computer science classes. Their goal is to  empower all students with the ability to code, and use it to make a  difference.</p>
                <Rating className="rating"/>
            </div>
            <div>
                <p>
                    ACM Teach LA features two main teams: 
                    <br/>
                    1. The development team, whose members create learning labs for the schools that Teach LA services.
                    
                    2. The curriculum team, whose members teach computer science to local Los Angeles schools on a weekly basis. 
                </p>
                <p id="descriptors">
                    <strong>Targeted majors:</strong> Computer Science
                    <br/>
                    
                    <strong>Category:</strong> Social good
                    <br/>
                    
                    <strong>Time commitment:</strong> &lt;5 hours/week
                    <br/>
                    
                    <strong>Application Required?:</strong> No
                    <br/>
                    
                    <strong>Currently Open to Join?:</strong> Yes
                </p>
            </div>
        </div>
    )
}

export default ClubInfoCard