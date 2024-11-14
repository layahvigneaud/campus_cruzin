import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarIcon from '../assets/car.svg';
import axios from 'axios';
import SignupButton from './SignupButton';
import LoginButton from './LoginButton';
import '../styles/Auth.css';

function Auth() {

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(response => {
            if (response.data.status) {
                navigate('/homepage');
            }
        })
    }, []);

    return (
        <div className="default-auth-container">
            <img src={ CarIcon } className="Campus-Cruisin-Car" alt="Car Icon"/>
            <div className="default-auth-container-right">
                <div className="project-title">
                    <h1>CAMPUS</h1>
                    <h1>CRUISIN'</h1>
                </div>
                <div className="button-cluster">
                    <SignupButton />
                    <LoginButton />
                </div>
            </div>
        </div>
    )
}

export default Auth