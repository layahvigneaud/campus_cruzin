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


    const handleMajorChange = (e) => {
        setMajor(e.target.value);
    }

    const handleClubChange = (e) => {
        setClub(e.target.value);
    }

    const handleApplicationChange = (e) => {
        setApplicationReq(e.target.value);
    }

    const handlePositionChange= (e) => {
        setClub(e.target.value);
    }




    return (    

        <div>
            <h1> Club Review Form </h1>

            <div>
            <label>
                <h3> Clubs </h3> 
                <select value = {club} onChange = {handleClubChange}>
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
            <p> Selected option: {club} </p>

            </div>

            <div>
            <label>
                <h3> Major </h3> 
                <select value = {major} onChange = {handleMajorChange}>
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
            <p> Selected option: {major} </p>

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
                            checked={applicationReq === "Yes"} 
                            onChange={handleApplicationChange}
                        />
                        No
                    </label>

                


            </div>

            <div>
                <h3> Application Required? </h3> 
                
                    <label>
                        <input 
                            type="radio" 
                            name="Position" 
                            value="General Member" 
                            checked={applicationReq === "Yes"} 
                            onChange={handlePositionChange}
                        />
                        General Member
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="Position" 
                            value="Intern" 
                            checked={applicationReq === "Yes"} 
                            onChange={handlePositionChange}
                        />
                        Intern
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="Position" 
                            value="Officer" 
                            checked={applicationReq === "Yes"} 
                            onChange={handlePositionChange}
                        />
                        Officer
                    </label>

                


            </div>


        </div>





    );
}

export default Review