import React, { useState } from 'react';
import UnsavedIcon from '../assets/emptybookmark.svg';
import '../styles/SaveButton.css';

function SaveButton() {
    const [saved, setSaved] = useState(false); {/* set to true based on get request from database */}

    const handleClick = () => {
        {/* save associated club and update  */}
    }

    return (
        <button onClick={ handleClick } className="save-button">
            {/* save icon based on save status */}
            <img src={saved ? UnsavedIcon : UnsavedIcon}/>
        </button>
    );
}

export default SaveButton;