import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import ClubInfoCard from './ClubInfoCard';
import '../styles/Club.css';
import axios from 'axios';

function Club() {
    const { clubId } = useParams(); //gets the club ID from the URL
    const [club, setClub] = useState(null); //stores the club data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterRating, setFilterRating] = useState('');

    useEffect(() => {
        const fetchClub = async () => {
            try {
                console.log('Fetching club with ID:', clubId);
                const response = await axios.get(`http://localhost:3001/clubs/${clubId}`);
                console.log('Club data:', response.data);
                setClub(response.data);
            } catch (error) {
                console.error('Error fetching club:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClub();
    }, [clubId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleChangeFilter = event => {
        setFilterRating(event.target.value);
    }

    return (
        <div>
            <Navbar/>
            <div className="club-content-container">
                <div>
                    <ClubInfoCard
                        title = {club.name}
                        description={club.description}
                        tags={club.tags}
                        moreinfo={club.hasOwnProperty('moreInfo') ? club.moreInfo : ""}
                    />
                </div>
                <div className="club-reviews-container">
                    <h3>Reviews</h3>
                    <div className="club-review-nav-bar">
                        <select
                            name="rating-filter"
                            value={filterRating}
                            onChange={handleChangeFilter}
                            id="club-rating-filter"
                        >
                            <option value="5.0">5.0 stars</option>
                            <option value="4.0">4.0 stars</option>
                            <option value="3.0">3.0 stars</option>
                            <option value="2.0">2.0 stars</option>
                            <option value="1.0">1.0 stars</option>
                            <option value="0.0">0.0 stars</option>
                        </select>
                        <button className="club-review-submit-button">Submit a Review!</button>
                    </div>
                    <div>
                        <ReviewCard/>
                        <ReviewCard/>
                        <ReviewCard/>
                        <ReviewCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Club