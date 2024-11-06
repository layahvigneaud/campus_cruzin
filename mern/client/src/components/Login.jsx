import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import SignupButton from './SignupButton'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    // submits form; if no error, then logs the results and nav to login
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/auth/login', {
            email, 
            password
        }).then(response => { 
            if (response.data.status) {
                navigate('/homepage');
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Log In</h2>
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
                    <label htmlFor="password">
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
                    Log In
                </button>
                <Link to="/forgotpassword">Forgot Password?</Link>
                <p>Don't have an account?</p>
                <SignupButton />
            </form>
        </div>
    );
}

export default Login;