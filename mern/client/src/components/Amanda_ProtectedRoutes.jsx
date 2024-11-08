// IMPORT THIS:
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// ADD THIS INTO THE FUNCTION:
const navigate = useNavigate();
axios.defaults.withCredentials = true;
useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
    .then(res => {
        if (!res.data.status) {
            navigate('/');
        }
    })
}, [])