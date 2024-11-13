import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar';  
import '../styles/Review.css';

function Review() {

    const [major, setMajor] = useState("");
    const [club, setClub] = useState(""); 
    const [applicationReq, setApplicationReq] = useState("")
    const [accepted, setAcceptance] = useState("")
    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")
    const [maxTime, setTime] = useState(0)
    const [maxRating, setRating] = useState(0)
    const [error, setError] = useState("")


    const navigate = useNavigate(-1);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(response => {
            if (!response.data.status) {
                navigate('/');
            }
        })
    }, []);


    const handleMajorChange = (e) => {
        setMajor(e.target.value);
    }
    const handleClubChange = (e) => {
        setClub(e.target.value);
    }
    const handleApplicationChange = (e) => {
        setApplicationReq(e.target.value);
    }
    const handleAcceptanceChange = (e) => {
        setAcceptance(e.target.value);
    }
    const handlePositionChange= (e) => {
        setPosition(e.target.value);
    }
    const handleDescriptionChange= (e) => {
        setDescription(e.target.value);
    }
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }
    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      
      if ( !club || !position || !description || applicationReq === "" ||accepted ===""){
        setError (" Please fill out ALL necessary fields ")
        alert(' Please fill out ALL necessary fields !! ')
        return
      }

      setError("")

      navigate(-1)
    }

    const isFormValid = club && position && description && applicationReq && accepted;
    return (    
        <div>
            <form onSubmit={handleSubmit}>
            <h1>Club Review Form</h1>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label>
                    <h3>Clubs<span className="asterisk">*</span></h3> 
                    <select 
                        id = "club"
                        value = {club} 
                        onChange = {handleClubChange}>

                        <option value="">--Select--</option> {/* Default empty option */}
                        <option value="ACM AI">
                            ACM AI</option>

                        <option value="IEEE">
                            IEEE</option>

                        <option value="club3">
                            club3</option>

                        <option value="club4">
                            club4</option>

                        <option value="club5">
                            club5</option>

                        
                    </select>

                </label>
                <p></p>

            </div>

            <div>
                <label>
                    <h3>Major</h3> 
                    <select 
                        id = "major"
                        value = {major} 
                        onChange = {handleMajorChange}>
                        
                        <option value="">--Select--</option>

                        <option value="Computer Science">
                            Computer Science</option>

                        <option value="Mechanical Engineering">
                            Mechanical Engineering</option>

                        <option value="Electrical Engineering">
                            Electrical Engineering</option>

                        <option value="Computer Engineering">
                            Computer Engineering </option>

                        <option value="Electrical and Computer Engineering">
                            Electrical and Computer Engineering</option>
                    </select>

                </label>
                <p></p>

            </div>

            <div>
                <h3>Position<span className="asterisk">*</span></h3>
                
                <input type="text" id="position" name="position" value={position} onChange={handlePositionChange}/>

                <p></p>

            </div>

            <div>
                <h3>Application Required?<span className="asterisk">*</span></h3> 
                
                    <label>
                        <input 
                            type="radio" 
                            name="Application Required" 
                            value="Yes" 
                            checked={applicationReq === "Yes"} 
                            onChange={handleApplicationChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="Application Required" 
                            value="No" 
                            checked={applicationReq === "No"} 
                            onChange={handleApplicationChange}
                        />
                        No
                    </label>
                    <p></p>                   
                

            </div>


            <div>
                <h3>Admitted?<span className="asterisk">*</span></h3> 
                
                    <label>
                        <input 
                            type="radio" 
                            name="Admitted" 
                            value="Yes" 
                            checked={accepted === "Yes"} 
                            onChange={handleAcceptanceChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="Admitted" 
                            value="No" 
                            checked={accepted === "No"} 
                            onChange={handleAcceptanceChange}
                        />
                        No
                    </label>
                    
                


            </div>


            
            <div style={{ padding: '20px' }}>
                <h1>Time Commitment (hrs/wk)<span className="asterisk">*</span></h1>
                <br />
                <input
                    id="hrs/wk"
                    type="range"
                    min="0"
                    max="7"
                    value={maxTime}
                    onChange={handleTimeChange}
                    style={{ width: '70%' }}
                />
            </div>

            <div style={{ padding: '20px' }}>
                <h1>Overall Rating<span className="asterisk">*</span></h1>
                <br />
                <input
                    id="overall rating"
                    type="range"
                    min="0"
                    max="10"
                    value={maxRating}
                    onChange={handleRatingChange}
                    style={{ width: '70%' }}
                />
            </div>


            <div>
                <h3>Description<span className="asterisk">*</span></h3>
                <p> How was the application process. </p>
                    <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange}/>


                 
            </div>

            <p></p>
            <p></p>

            <button type="submit">Submit Review :) </button>
            
            
            </form>
        
        </div>



    );
}

export default Review