import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import SignupButton from './SignupButton'
import BackButton from "./BackButton";
import '../styles/AuthPages.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(response => {
            if (response.data.status) {
                navigate(-1);
            }
        })
    }, []);

    // submits form; if no error, then logs the results and nav to login
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("All fields are required!");
            return;
        }

        axios.post('http://localhost:3001/auth/login', {
            email, 
            password
        }).then(response => { 
            if (response.data.status) {
                navigate('/homepage');
            }
            else if (response.data.message === "user is not registered") {
                alert("User does not exist!");
            }
            else if (response.data.message === "password is incorrect") {
                alert("Password is incorrect!");
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className="auth-container">
            <div className="auth-form" onSubmit={handleSubmit}>
                <BackButton />
                <form className="auth-form-content">
                    <h2>Log In</h2>
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
                        <label htmlFor="password">
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
                            Log In
                        </button>
                        <div className="navigate-away-section">
                            <Link to="/forgotpassword"><p>Forgot Password?</p></Link>
                            <hr className="rounded" /> 
                            <div>
                                <p>Don't have an account?</p>
                                <SignupButton />
                            </div>
                        </div>
                    </div>    
                </form>
            </div>
        </div>
    );
}

export default Login;