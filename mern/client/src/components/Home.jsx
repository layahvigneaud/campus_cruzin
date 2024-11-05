import Navbar from './Navbar';
import { Link } from "react-router-dom";

function Home() {
    const filterTags = ["Computer Science", "Social Good", "Aerospace Enginerring"];
    return (
        <div class="clubs">
            <Navbar/>
            <div class="home-container">
                <div class="home-elements">
                    <h1 className="home-logo">CAMPUS CRUISIN'</h1>
                    <input class="search-bar" type="text" placeholder="Club Name"></input>
                    <Link to="/searchclubs">
                        <button type="button">Search All Clubs</button>
                    </Link>
                
                
                <div className="filter">
                    <h2>FILTER TAGS</h2>
                    <ul>
                        {filterTags.map((tag, index) => (
                            <li key={index}>{tag}</li>
                        ))}
                    </ul>
                </div>
                    
                <div className="club-card1">
                    <h2>ACM</h2>
                    <Link to="/searchclubs">
                        <button type="button">Learn More</button>
                    </Link>
                </div>

                <div className="club-card2">
                    <h2>LA Blueprint</h2>
                    <Link to="/searchclubs">
                        <button type="button">Learn More</button>
                    </Link>
                </div>

                <div className="club-card3">
                    <h2>Rocket Project</h2>
                    <Link to="/searchclubs">
                        <button type="button">Learn More</button>
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