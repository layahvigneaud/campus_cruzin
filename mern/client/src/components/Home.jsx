import Navbar from './Navbar';
import ClubCard from './ClubCard';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import '../styles/Home.css';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(response => {
            if (!response.data.status) {
                console.log(response.data);
                navigate('/');
            }
        })
    }, []);

    return (
        <div class="clubs">
            <Navbar />
            <div class="home-container">
                <div class="home-elements">
                    <div class="search-and-cards">
                        <div class="search-division">
                            <input class="search-bar" type="text" placeholder="Club Name"></input>
                            <Link to="/searchclubs">
                                <button type="button">Search All Clubs</button>
                            </Link>
                        </div>


                        <div class="club-cards-container">
                            <div class="side-by-side">
                                <ClubCard
                                    title="ACM Teach LA"
                                    description="ACM Teach LA pairs UCLA students with schools in 
                                Los Angeles to provide free computer science 
                                classes. Their goal is to empower students with 
                                the ability to code, and use it to make a difference."
                                />

                                <ClubCard
                                    title="IEEE"
                                    description="IEEE at UCLA is an engineering organization that 
                            devotes time and energy towards bringing hands-
                            on, practical experiences to engineering students 
                            at UCLA. They lead several projects for members to 
                            participate in, guided by dedicated leads."
                                />
                            </div>

                            <div class="side-by-side">
                                <ClubCard
                                    title="LA Blueprint"
                                    description=" LA Blueprint is a student-run 501(c)(3) nonprofit
                            committed to building and promoting tech for Social
                            good--free of charge. They collaborate with 
                            nonprofit organizations in Southern California and 
                            beyond to build mobile and web applications."
                                />

                                <ClubCard
                                    title="SWE"
                                    description="SWE-UCLA aims to bring professional development
                            opprotunities to UCLA while advocating for the
                            creation of an equal platform for all in engineering.
                            SWE-UCLA has 7 committees and a Grad SWE 
                            committee for UCLA grad students."
                                />
                            </div>
                        </div>
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