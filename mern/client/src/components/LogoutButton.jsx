import Axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    const handleLogout = () => {
        Axios.get('http://localhost:3001/auth/logout')
        .then(res => {
            if(res.data.status) {
                navigate('/')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton