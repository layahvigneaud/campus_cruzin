import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import ClubCard from './ClubCard';
import '../styles/Home.css';

function FilterComponent({ selectedTags, onTagChange }) {

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

    const tags = [
        "design", "media", "cloud platforms", "programming", "cybersecurity", "community",
        "women in tech", "Hackathons", "professional development", "AI & Data Science",
        "engineering disciplines", "hands-on experience", "research & innovation"
    ];

    return (
        <div>
            {tags.map((tag, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`tag-${index}`}
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => onTagChange(tag)}
                    />
                    <label htmlFor={`tag-${index}`}>
                        {tag}
                    </label>
                </div>
            ))}
        </div>
    );
}

function Home() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleTagChange = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    const fetchClubs = async (tags = []) => {
        try {
            setLoading(true);
            let response;

            if (tags.length === 0) {
                response = await axios.get('http://localhost:3001/clubs/populate');
            } else {
                response = await axios.post('http://localhost:3001/clubs/filter', { tags });
            }

            setClubs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching clubs:', error);
            setError('Failed to load clubs');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClubs();
    }, []);

    const handleFilterClick = () => {
        fetchClubs(selectedTags);
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible((prevVisible) => !prevVisible);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredClubs = clubs.filter((club) =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div class="home-clubs">
            <Navbar />
            <div className="home-container">
                <div className="home-search-and-cards">
                    {/* Left Sidebar with Search and Filters */}
                    <div className="home-search-division">
                        <h1>Filters</h1>
                        <nav>
                            <form>
                                <input
                                    className="home-search-bar"
                                    type="search"
                                    placeholder="Search by club name"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </form>
                        </nav>
                        <div>
                            <button
                                onClick={toggleFilterVisibility}
                                className="home-filter-buttons"
                            >
                                {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
                            </button>
                            {isFilterVisible && (
                                <div>
                                    <FilterComponent selectedTags={selectedTags} onTagChange={handleTagChange} />
                                    <button onClick={handleFilterClick}>
                                        Apply Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Content Area for Clubs */}
                    <div className="home-club-cards-container">
                        <h1>Clubs</h1>
                        <div className="home-card-grid">
                            {filteredClubs.map((club) => (
                                <div key={club._id} className="home-clubcard">
                                    <ClubCard 
                                        title={club.name}
                                        description={club.description}
                                        club_id={club._id}
                                    />
                                </div>
                            ))}
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;