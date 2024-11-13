import { useState } from "react";
import axios from 'axios';
import BackButton from './BackButton'; 
import '../styles/AuthPages.css';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/auth/forgotpassword', {
            email
        }).then(response => { 
            if (response.data.status) {
                alert("An email has been sent to reset your password!");
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
                    <h2>Forgot Password?</h2>
                    <div className="input-label">
                        <label htmlFor="email">
                            <h3>Email</h3>
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
                    <button type="submit">
                        Send Email
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword