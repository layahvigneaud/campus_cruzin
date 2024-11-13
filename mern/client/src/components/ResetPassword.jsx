import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AuthPages.css';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password) {
            alert("Please provide a password!");
            return;
        }

        axios.post(`http://localhost:3001/auth/resetpassword/${token}`, {
            password
        }).then(response => { 
            if (response.data.status) {
                navigate('/login');
            }
            console.log(response.data);
            console.log(token);
        }).catch(err => {
            console.log(err);
        });
    } 

    return (
        <div className="auth-container">
            <div className="auth-form" onSubmit={handleSubmit}>
                <form className="auth-form-content">
                    <h2 className="reset-password">Reset Password</h2>
                    <div className="input-label">
                        <label htmlFor="password">
                            <h3>Enter New Password</h3>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">
                        Reset
                    </button>
                </form>
            </div>
        </div>  
    );
}

export default ResetPassword;