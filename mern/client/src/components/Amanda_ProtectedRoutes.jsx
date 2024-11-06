// IMPORT THIS:
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


// ADD THIS INTO THE FUNCTION:
const navigate = useNavigate();
Axios.defaults.withCredentials = true;
useEffect(() => {
    Axios.get('http://localhost:3001/auth/verify')
    .then(res => {
        if (!res.data.status) {
            navigate('/');
        }
    })
}, [])