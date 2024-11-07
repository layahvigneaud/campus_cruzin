import { Link } from "react-router-dom";
import Navbar from './Navbar';  
import './Review.css';
import { useState } from 'react'






function Review() {
    const clubOptions = {

    }

   
    const [major, setMajor] = useState("");
    const [club, setClub] = useState(""); 
    const [applicationReq, setApplicationReq] = useState("")
    const [position, setPosition] = useState("")
    const [maxTime, setTime] = useState("")
    const [maxRating, setRating] = useState("")


    const handleMajorChange = (e) => {
        setMajor(e.target.value);
        e.preventDefault();
        // Validate that a valid option is selected
        if (!major) {
            setError("Please select a valid option");
        } else {
            setError("");
            // Form submission logic here
            console.log("Form submitted with:", selectedOption);
        }
    }

    const handleClubChange = (e) => {
        setClub(e.target.value);
    }

    const handleApplicationChange = (e) => {
        setApplicationReq(e.target.value);
    }

    const handlePositionChange= (e) => {
        setPosition(e.target.value);
    }
    
    const [maxValue, setMaxValue] = useState(7);

    // Handle changes to the min and max values
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }


   


    return (    

        <div>
            <h1> Club Review Form </h1>

            <div>
                <label>
                    <h3> Clubs </h3> 
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
                    <h3> Major (I FEEL IS UNNECCESARY ) </h3> 
                    <select 
                        id = "major"
                        value = {major} 
                        onChange = {handleMajorChange}>
                        
                        <option value="">--Select--</option> {}

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
                <h3> Application Required? </h3> 
                
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
                <h3>
                    Position




                </h3>

                <p></p>

            </div>


            <div>
                <h3> Admitted? </h3> 
                
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
                    
                


            </div>


            
            <div style={{ padding: '20px' }}>
                <h1> Time Commitment (hrs/wk) </h1>
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
                <h1> Overall Rating </h1>
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
                <h3>Description</h3>
                <p> How was the application process. </p>
            </div>







        </div>



    );
}

export default Review