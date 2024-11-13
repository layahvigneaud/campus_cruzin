import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupButton from './SignupButton';
import LoginButton from './LoginButton';

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
        <div>
            <SignupButton />
            <LoginButton />
        </div>
    )
}

export default Auth