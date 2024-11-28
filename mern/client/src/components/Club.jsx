import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackButton from './BackButton';
import ReviewCard from './ReviewCard';
import ClubInfoCard from './ClubInfoCard';
import '../styles/Club.css';
import axios from 'axios';

function Club() {
    const { clubId } = useParams(); //gets the club ID from the URL
    const [club, setClub] = useState(null); //stores the club data
    const [filterRating, setFilterRating] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //get club data from the server
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

    //get reviews for the club
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log('Fetching reviews for club with ID:', clubId);
                const response = await axios.get(`http://localhost:3001/reviews/${clubId}`);
                setReviews(response.data);
                console.log('Reviews:', response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [clubId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleChangeFilter = event => {
        setFilterRating(event.target.value);
    }

    /*get average sentiment for:
    * - overall rating
    * - application process
    * - time commitment
    * - major
    */
    let overallRating = 0;
    let application = 0;
    let timeCommitment = -1;
    let major = '';
    let applicationCount = [0, 0];
    let majorCounts = new Map();

    let length = reviews.length;
    for(let i = 0; i < length; i++) {
        overallRating += reviews[i].overallRating;
        //count number of reviews that say the club requires an application
        if(reviews[i].application === "yes") {
            applicationCount[0]++;
        }
        else{
            applicationCount[1]++;
        }
        timeCommitment += Number(reviews[i].timeCommitment);
        if(majorCounts.has(reviews[i].major)) {
            majorCounts.set(reviews[i].major, majorCounts.get(reviews[i].major) + 1);
        }
        else {
            majorCounts.set(reviews[i].major, 1);
        }
    }

    //update application status based on highest number of responses
    application = applicationCount[0] > applicationCount[1] ? "Yes" : "No";
    overallRating = length != 0 ? ((overallRating/length).toFixed(1)) : overallRating.toFixed(1);
    timeCommitment = length != 0 ? (Math.floor(timeCommitment / length)) : timeCommitment;

    let maxCount = 0;
    for(let [key, value] of majorCounts) {
        if(value > maxCount) {
            major = key;
            maxCount = value;
        }
    }

    //page contents
    return (
        <div>
            <Navbar/>
            <div className="club-content-container">
                <BackButton/>
                <div>
                    <ClubInfoCard
                        title = {club.name}
                        description={club.description}
                        tags={club.tags}
                        major = {major}
                        rating = {overallRating}
                        time = {timeCommitment}
                        application = {application}
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
                        <Link to="/review">
                            <button className="club-review-submit-button">Submit a Review!</button>
                        </Link>
                    </div>
                    <div>
                        {reviews.map(review => (
                            <ReviewCard
                                description={review.description}
                                major={review.major}
                                application={review.application}
                                time={review.timeCommitment}
                                position={review.position}
                                rating={review.overallRating}
                                date={review.createdAt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Club