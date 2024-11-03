import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';

function Home() {
    return (
        <div class="home">
            <Navbar/>
            <div class="home-container">
                <div class="home-elements">
                    <h1 className="home-logo">CAMPUS CRUISIN'</h1>
                    <input class="search-bar" type="text" placeholder="Club Name"></input>
                    <Link to="/searchclubs">
                        <button type="button">Search All Clubs</button>
                    </Link>
                </div>   
            </div>
        </div>
    );
}

export default Home