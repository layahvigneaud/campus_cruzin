import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import ReviewCard from './ReviewCard';
import BackButton from './BackButton';
import '../styles/SavedReviews.css';

function SavedReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify')
        .then(response => {
            if (!response.data.status) {
                navigate('/');
            }
        })
    }, []);

    useEffect(() => {
        const fetchSavedReviews = async () => {
            try {
                const res = await axios.get('http://localhost:3001/auth/user', { withCredentials: true });
                const savedReviewIDs = res.data.user.savedReviews;

                const fetchedReviews = await Promise.all(
                    savedReviewIDs.map(async id => {
                        const reviewsResponse = await axios.get(`http://localhost:3001/reviews/getReview/${id}`)
                        const savedReview = reviewsResponse.data
                        return {
                            ...savedReview
                        };
                    })
                )
                setReviews(fetchedReviews);
            } catch (error) {
                console.error("Error fetching saved reviews");
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedReviews();
    }, []);

    if (loading) {
        return (
            <p>Loading...</p>
        )}
        
    if(error) {
        return (
            <p>{error}</p>
        )}

    return (
        <div>
            <Navbar/>
            <div className="saved-reviews-content-container">
                <BackButton/>
                <h1 className="saved-reviews-title">Your Saved Reviews</h1>
                {reviews.length > 0 ? 
                    reviews.map((review) => (
                        <div key={review._id} className="savedreviews-clubcard">
                            <ReviewCard 
                                description={review.description}
                                major={review.major}
                                application={review.application}
                                time={review.timeCommitment}
                                position={review.position}
                                rating={review.overallRating}
                                date={review.createdAt}
                                review_id={review._id}
                                isSaved={true}
                            />
                        </div>))
                    : <h1 className="saved-reviews-title">Save some reviews to get started!</h1>
                }
            </div>
        </div>
    );
}

export default SavedReviews