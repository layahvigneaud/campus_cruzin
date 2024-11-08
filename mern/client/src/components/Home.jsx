import Navbar from './Navbar';
import { Link } from "react-router-dom";
import './Home.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const filterTags = ["Computer Science", "Social Good", "Aerospace Engineering"];
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(response => {
            if (!response.data.status) {
                navigate('/');
            }
        })
    }, []);

    return (
        <div class="clubs">
            <Navbar />
            <div class="home-container">
                <div class="home-elements">
                    <h1 class="home-logo">CAMPUS CRUISIN'</h1>
                    <input class="search-bar" type="text" placeholder="Club Name"></input>
                    <Link to="/searchclubs">
                        <button type="button">Search All Clubs</button>
                    </Link>

                    <div class="filter">
                        <h2>FILTER TAGS</h2>
                        <ul>
                            {filterTags.map((tag, index) => (
                                <li key={index}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="club-cards-container">
                
                <div class="side-by-side">
                    <div class="club-card">
                        <Link to="/searchclubs">
                            <button type="button">ACM Teach LA</button>
                        </Link>
                    </div>

                    <div class="club-card">
                        <Link to="/searchclubs">
                            <button type="button">IEEE</button>
                        </Link>
                    </div>
                </div>

                <div class="side-by-side">
                    <div class="club-card">
                        <Link to="/searchclubs">
                            <button type="button">LA Blueprint</button>
                        </Link>
                    </div>

                    <div class="club-card">
                        <Link to="/searchclubs">
                            <button type="button">SWE</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div class="club-cards">
                <div class="card-body">
                    <Link to='/club'>
                        <h2 class="card-title">Club Name</h2>
                    </Link>
                    <p class="card-text">This is a short description of the card content.</p>
                </div>
            </div>
        </div>
    );
}

export default Home