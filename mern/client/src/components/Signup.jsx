import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import LoginButton from './LoginButton'

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
        <h2>Sign Up</h2>
        <form className='auth-form' onSubmit={handleSubmit}>
            <div className="input-label">
                <label htmlFor="username">
                    <strong>Username</strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    autoComplete="off"
                    name="username"
                    className="form-control rounded-0"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-label">
                <label htmlFor="email">
                    <strong>Email</strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-label">
                <label htmlFor="email">
                    <strong>Password</strong>
                </label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    name="password"
                    className="form-control rounded-0"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">
                Sign Up
            </button>
        </form>
        <p>Already have an account?</p>
        <LoginButton />
    </div>
    );
}

export default Signup;