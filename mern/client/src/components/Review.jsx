import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import Navbar from "./Navbar";
import BackButton from './BackButton';
import axios from 'axios';
import "../styles/Review.css";

const InterviewForm = () => {
    
    const applicationRequiredOptions = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const offeredPositionOptions = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "Pending", label: "Pending" }
    ];

    const timeCommitmentOptions = [
        {value: -1, label: "-1"},
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7+"},
    ];  

    const overallRatingOptions = [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
    ];  

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [club, setClub] = useState("");
    const [clubOptions, setClubOptions] = useState([]);
    const [position, setPosition] = useState("");
    const [applicationRequired, setApplicationRequired] = useState("");
    const [offeredPosition, setOfferedPosition] = useState("");
    const [timeCommitment, settimeCommitment] = useState(timeCommitmentOptions[0]); 
    const [description, setDescription] = useState("");
    const [major, setMajor] = useState("");
    const [overallRating, setOverallRating] = useState(overallRatingOptions[0]);

    useEffect(() => {
        const getClubs = async () => {
            try {
                //retrieve clubs from clubs/populate routing
                const response = await axios.get('http://localhost:3001/clubs/populate');
                const dataClubOptions = (response.data).map(item => ({
                    value: item._id,
                    label: item.name
                })); //store in react state

                setClubOptions(dataClubOptions);
                setLoading(false);
            }
            catch (error) {
                //catch errors and output
                console.error('Error fetching clubs:', error);
                setError('Failed to load clubs');
                setLoading(false);
            }

        }
        getClubs();
    }, []);   

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload
        console.log("Enter")
        if (!club || !major || !applicationRequired || !description || 
            timeCommitment.value === timeCommitmentOptions[0].value || 
            overallRating.value === overallRatingOptions[0].value) 
        {
            alert("Please fill in all required fields!");
            return;
        }
        if (!club) {
            console.error("Club not selected");
            return;
        }
   
        const reviewData = {
            club: club.value, // Ensure this is the ID of the selected club
            major: major.value, // Extract the value from the major state
            position,
            application: applicationRequired.value,
            offeredPosition: offeredPosition.value, // Extract the value
            timeCommitment: timeCommitment.value, // Extract the value
            description,
            overallRating: overallRating.value, // Extract the value
        };
        console.log("Review Data being sent:", reviewData);
   
        try {
            const response = await axios.post('http://localhost:3001/reviews/addReview', reviewData);
            if (response.status === 201) {
                console.log("Review submitted successfully!");
                navigate(-1);
                setTimeout(() => {
                    alert("Thank you for submitting your review!"); 
                 }, 100);            
            } 
            else {
                console.error("Error submitting review:", response.data);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;   

    return (
        <div className="review-container">
            <Navbar/>
            <div className="review-form-container">
                <div className="review-form">
                    <BackButton className = "back-button"/>
                    <form className="review-form-content" onSubmit={ handleSubmit }>
                        <h2>Club Details</h2> 
                        <p><span className = "asterisk">*</span> Club Name:</p>
                        <CreatableSelect
                        className="s-skills-select"
                        value={club}
                        onChange={(newValue) => {
                            setClub(newValue);
                        }}
                        options={
                            clubOptions
                        }
                        />    
                        <p><span className = "asterisk">*</span> Major:</p>
                        <CreatableSelect
                        className="s-skills-select"
                        value={major}
                        onChange={(newValue) => {
                            setMajor(newValue);
                        }}
                        options={[
                            { value: "Computer Science", label: "Computer Science" },
                            { value: "Computer Science and Engineering", label: "Computer Science and Engineering" },
                            { value: "Computer Engineering", label: "Computer Engineering" },
                            { value: "Electrical Engineering", label: "Electrical Engineering" },
                            { value: "Chemical Engineering", label: "Chemical Engineering" },
                            { value: "Mathematics of Computation", label: "Mathematics of Computation" },
                            { value: "Linguistics and Computer Science", label: "Linguistics and Computer Science" },
                            { value: "Mechanical Engineering", label: "Mechanical Engineering" },
                            { value: "Aerospace Engineering", label: "Aerospace Engineering" },
                            { value: "Civil Engineering", label: "Civil Engineering" },
                            { value: "Chemical Engineering", label: "Chemical Engineering" },
                            { value: "Biomedical Engineering", label: "Biomedical Engineering" },  
                        ]}
                        />
                        <p>Position <span className = "little-note"> (if any) </span></p>
                        <input
                        type="text"
                        name="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="s-input"
                        />    
                        <p><span className = "asterisk">*</span> Application Required?</p>
                        <div id="application-required">
                        {applicationRequiredOptions.map((option) => (
                            <div key={option.value}>
                            <label>
                                <input
                                type="radio"
                                value={option.value}
                                checked={applicationRequired.value === option.value}
                                onChange={e => {
                                    const selectedOption = applicationRequiredOptions.find(option => option.value === e.target.value);
                                    setApplicationRequired(selectedOption);
                                }}
                                />
                                {option.label}
                            </label>
                            </div>
                        ))}
                        </div>    
                        <p>If so, were you offered a position?</p>
                        <div id="offeredPosition">
                        {offeredPositionOptions.map((option) => (
                            <div key={option.value}>
                            <label>
                                <input
                                type="radio"
                                value={option.value}
                                checked={offeredPosition.value === option.value}
                                onChange={e => {
                                    const selectedOption = offeredPositionOptions.find(option => option.value === e.target.value);
                                    setOfferedPosition(selectedOption);
                                }}
                                />
                                {option.label}
                            </label>
                            </div>
                        ))}
                        </div>    
                        <p><span className = "asterisk">*</span> Time Commitment (hrs per wk)</p>
                        <fieldset className="range-field">
                            <input
                                className="range"
                                type="range"
                                min="0"
                                max="7"
                                step="1"
                                value={timeCommitment.value}
                                onChange={e => {
                                    const index = parseInt(e.target.value) + 1;
                                    const selectedOption = timeCommitmentOptions[index];
                                    settimeCommitment(selectedOption);
                                }}
                            />
                            <svg role="presentation" width="100%" height="10">
                                <rect className="range__tick" x="1%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="15.3%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="29.25%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="43%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="57.14%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="70.5%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="84.5%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="98%" y="3" width="1" height="10"></rect>
                            </svg>
                            <svg role="presentation" width="100%" height="14">
                                <text className="range__point" x="1%" y="14" textAnchor="start">{timeCommitmentOptions[1].label}</text>
                                <text className="range__point" x="15.3%" y="14" textAnchor="middle">{timeCommitmentOptions[2].label}</text>
                                <text className="range__point" x="29.25%" y="14" textAnchor="middle">{timeCommitmentOptions[3].label}</text>
                                <text className="range__point" x="43%" y="14" textAnchor="middle">{timeCommitmentOptions[4].label}</text>
                                <text className="range__point" x="57.14%" y="14" textAnchor="middle">{timeCommitmentOptions[5].label}</text>
                                <text className="range__point" x="70.5%" y="14" textAnchor="middle">{timeCommitmentOptions[6].label}</text>
                                <text className="range__point" x="84.5%" y="14" textAnchor="middle">{timeCommitmentOptions[7].label}</text>
                                <text className="range__point" x="98%" y="14" textAnchor="middle">{timeCommitmentOptions[8].label}</text>
                            </svg>
                        </fieldset>   
                        <p><span className = "asterisk">*</span> Overall Rating</p>
                        <fieldset className="range-field">
                            <input
                                className="range"
                                type="range"
                                min="0"
                                max="4"
                                step="1"
                                value={overallRating.value - 1}
                                onChange={e => {
                                    const index = parseInt(e.target.value) + 1;
                                    console.log(index);
                                    console.log(overallRatingOptions[index]);
                                    setOverallRating(overallRatingOptions[index]);
                                    console.log(overallRating);
                                }}
                            />
                            <svg role="presentation" width="100%" height="10">
                                <rect className="range__tick" x="0.5%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="25%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="50%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="75%" y="3" width="1" height="10"></rect>
                                <rect className="range__tick" x="99%" y="3" width="1" height="10"></rect>
                            </svg>
                            <svg role="presentation" width="100%" height="14">
                                <text className="range__point" x="0.1%" y="14" textAnchor="start">{overallRatingOptions[1].label}</text>
                                <text className="range__point" x="25%" y="14" textAnchor="middle">{overallRatingOptions[2].label}</text>
                                <text className="range__point" x="50%" y="14" textAnchor="middle">{overallRatingOptions[3].label}</text>
                                <text className="range__point" x="75%" y="14" textAnchor="middle">{overallRatingOptions[4].label}</text>
                                <text className="range__point" x="99%" y="14" textAnchor="middle">{overallRatingOptions[5].label}</text>
                            </svg>
                        </fieldset>   
                        <p><span className = "asterisk">*</span> Description</p>
                        <textarea
                        name="description"
                        rows="5"
                        cols="50"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="s-input"
                        ></textarea>  
                        <div>
                            <button type="submit" className="button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default InterviewForm;