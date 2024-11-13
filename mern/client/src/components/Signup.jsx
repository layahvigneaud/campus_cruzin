import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LoginButton from './LoginButton';
import BackButton from "./BackButton";
import '../styles/AuthPages.css';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // submits form; if no error, then logs the results and nav to login
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.endsWith("ucla.edu"))
            return;
        axios.post('http://localhost:3001/auth/signup', {
            username, email, password
        }).then(response => { 
            if (response.data.status) {
                navigate('/login');
            }
        }).catch(err => {
            console.log(err);
        });
    } 

    return (
    <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
            <BackButton />
            <div className="auth-form-content">
                <h2>Sign Up</h2>
                <div className="input-label">
                    <label htmlFor="username">
                        <h3>Username</h3>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        autoComplete="off"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-label">
                    <label htmlFor="email">
                        <h3>Email</h3>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-label">
                    <label htmlFor="email">
                        <h3>Password</h3>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="auth-footer">
                    <button type="submit">
                        Sign Up
                    </button>
                    <hr className="rounded" /> 
                    <div className="navigate-away-section">
                        <p>Already have an account?</p>
                        <LoginButton />
                    </div>
                </div> 
            </div>
        </form>
    </div>
    );
}

export default Signup;