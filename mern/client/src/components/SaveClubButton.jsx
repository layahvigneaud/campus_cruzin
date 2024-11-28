import React, { useState } from 'react';
import UnsavedIcon from '../assets/emptybookmark.svg';
import SavedIcon from '../assets/filledinbookmark.svg';
import axios from 'axios';
import '../styles/SaveClubButton.css';

function SaveClubButton({ saveState, clubId }) {
    const [saved, setSaved] = useState(saveState); /* set to true based on get request from database */
    const handleClick = () => {
        const newSaveState = !saved;
        try {
            if (newSaveState)
            {
                axios.post('http://localhost:3001/auth/saveClub', { 
                    clubId 
                }).then(response => {
                    if (response.data.status)
                        console.log("Club successfully saved!");
                    else
                        console.log("Something went wrong!");
                }).catch(err => {
                    console.log(err);
                });
            }
            else 
            {
                axios.post('http://localhost:3001/auth/unsaveClub', {
                    clubId
                }).then(response => {
                    if (response.data.status)
                        console.log("Club successfully saved!");
                    else 
                        console.log("Something went wrong!");
                }).catch(err => {
                    console.log(err);
                });
            }
            setSaved(newSaveState);        
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button onClick={ handleClick } className="save-club-button">
            {/* save icon based on save status */}
            <img src={saved ? SavedIcon : UnsavedIcon}/>
        </button>
    );
}

export default SaveClubButton;