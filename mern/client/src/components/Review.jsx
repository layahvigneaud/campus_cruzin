// TODO: figure out how to make slider map to string values

import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import BackButton from './BackButton';
import axios from 'axios';
import "../styles/Review.css";

const InterviewForm = () => {

    const applicationRequiredOptions = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ];

    const offeredPositionOptions = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "pending", label: "Pending" }
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

    const handleSubmit = (e) => {
        e.preventDefault();   
        if (club === "" || major === "" || applicationRequired === "" || timeCommitment === timeCommitmentOptions[0] || description === "") {
            alert("Please fill in all required fields!");
            return;
        }
        console.log(club, major, position, offeredPosition, timeCommitment, description);
    };  

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;   

    return (
        <div className="review-container">
            <div className="review-form">
                <BackButton/>
                <form className="review-form-content">
                    <h2>Club Details</h2> 
                    <p>* Club Name:</p>
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
                    <p>* Major:</p>
                    <CreatableSelect
                    className="s-skills-select"
                    value={major}
                    onChange={(newValue) => {
                        setMajor(newValue);
                    }}
                    options={[
                        { value: "ComputerScience", label: "Computer Science" },
                        { value: "ComputerScienceandEngineering", label: "Computer Science and Engineering" },
                        { value: "ComputerEngineering", label: "Computer Engineering" },
                        { value: "ElectricalEngineering", label: "Electrical Engineering" },
                        { value: "ChemicalEngineering", label: "Chemical Engineering" },
                        { value: "MathematicsofComputation", label: "Mathematics of Computation" },
                        { value: "LinguisticsandComputerScience", label: "Linguistics and Computer Science" },
                        { value: "MechanicalEngineering", label: "Mechanical Engineering" },
                        { value: "AerospaceEngineering", label: "Aerospace Engineering" },
                        { value: "CivilEngineering", label: "Civil Engineering" },
                        { value: "ChemicalEngineering", label: "Chemical Engineering" },
                        { value: "BiomedicalEngineering", label: "Biomedical Engineering" },  
                    ]}
                    />
                    <p>Position (if any)</p>
                    <input
                    type="text"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="s-input"
                    />    
                    <p>* Application Required?</p>
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
                    <p>Were you offered a position?</p>
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
                    <p>* Time Commitment (per wk)</p>
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
                    <p>* Description</p>
                    <textarea
                    name="description"
                    rows="5"
                    cols="50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="s-input"
                    ></textarea>  
                    <div>
                        <button type="submit" className="button" onClick={(e) => { handleSubmit(e) }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InterviewForm;