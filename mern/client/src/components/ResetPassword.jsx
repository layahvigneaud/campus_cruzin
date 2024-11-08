import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

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
        <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <div className="input-label">
                    <label htmlFor="password">
                        <strong>Enter New Password</strong>
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
    )
}

export default ResetPassword;