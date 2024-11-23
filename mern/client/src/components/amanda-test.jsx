import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/amanda-test.css';
import { Link } from "react-router-dom";

function FilterComponent({ selectedTags, onTagChange }) {
    const tags = [
        "design", "media", "cloud platforms", "programming", "cybersecurity", "community",
        "women in tech", "Hackathons", "professional development", "AI & Data Science",
        "engineering disciplines", "hands-on experience", "research & innovation"
    ];

    return (
        <div className="mt-3">
            {tags.map((tag, index) => (
                <div key={index} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`tag-${index}`}
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => onTagChange(tag)}
                    />
                    <label className="form-check-label" htmlFor={`tag-${index}`}>
                        {tag}
                    </label>
                </div>
            ))}
        </div>
    );
}

function AmandaTest() {
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
        <div>
            <Navbar />
            <div className="amanda-test-container">
                <div className="amanda-test-row">
                    {/* Left Sidebar with Search and Filters */}
                    <div className="col-md-4">
                        <h1>Filters</h1>
                        <nav>
                            <form>
                                <input
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
                    <div>
                        <h1>Clubs</h1>
                        <div>
                            {filteredClubs.map((club) => (
                                <div key={club._id} className="amanda-test-clubcard">
                                    <Link to={`/${club._id}`}>
                                        <h3>{club.name}</h3>
                                    </Link>
                                    <p>{club.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AmandaTest;
