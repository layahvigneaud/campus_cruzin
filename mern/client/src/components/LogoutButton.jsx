import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get('http://localhost:3001/auth/logout')
        .then(res => {
            if(res.data.status) {
                navigate('/')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <button onClick={handleLogout} style={{ fontWeight: 'bold' }}>LOG OUT</button>
    );
}

export default LogoutButton