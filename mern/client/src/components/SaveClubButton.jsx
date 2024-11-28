import React, { useState } from 'react';
import UnsavedIcon from '../assets/emptybookmark.svg';
import SavedIcon from '../assets/filledinbookmark.svg';
import '../styles/SaveClubButton.css';

function SaveClubButton({ saveState }) {
    const [saved, setSaved] = useState(saveState); {/* set to true based on get request from database */}
    const handleClick = () => {
        setSaved(!saved);
        {/* save associated club and update  */}
    }

    return (
        <button onClick={ handleClick } className="save-club-button">
            {/* save icon based on save status */}
            <img src={saved ? SavedIcon : UnsavedIcon}/>
        </button>
    );
}

export default SaveClubButton;