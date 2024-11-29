import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ClubInfoCard from './ClubInfoCard';
import BackButton from './BackButton';
import '../styles/SavedClubs.css';

function SavedClubs() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchSavedClubs = async () => {
            try {
                const res = await axios.get('http://localhost:3001/auth/user', { withCredentials: true });
                const savedClubIDs = res.data.user.savedClubs;

                const fetchedClubs = await Promise.all(
                    savedClubIDs.map(async id => {
                        const clubResponse = await axios.get(`http://localhost:3001/clubs/${id}`);
                        const reviewsResponse = await axios.get(`http://localhost:3001/reviews/${id}`);

                        const club = clubResponse.data;
                        const reviews = reviewsResponse.data;

                        let overallRating = 0;
                        let application = 0;
                        let applicationCount = [0, 0];
                        let timeCommitment = -1;
                        let majorCounts = new Map();

                        reviews.forEach(review => {
                            overallRating += review.overallRating;
                            timeCommitment += Number(review.timeCommitment);
                            if (review.application === "yes")
                                applicationCount[0]++;
                            else 
                                applicationCount[1]++;
                            
                            if (majorCounts.has(review.major)) 
                                majorCounts.set(review.major, majorCounts.get(review.major) + 1);
                            else
                                majorCounts.set(review.major, 1);
                        });

                        overallRating = reviews.length ? (overallRating / reviews.length).toFixed(1) : overallRating;
                        timeCommitment = reviews.length ? Math.floor(timeCommitment / reviews.length) : timeCommitment;
                        application = applicationCount[0] > applicationCount[1] ? "Yes" : "No";

                        let major = '';
                        let maxCount = 0;
                        for (let [key, value] of majorCounts) {
                            if (value > maxCount) {
                                major = key;
                                maxCount = value;
                            }
                        }

                        return {
                            ...club,
                            overallRating: overallRating,
                            timeCommitment: timeCommitment,
                            application,
                            major: major,
                        };
                    })
                );

                setClubs(fetchedClubs);
            } catch (error) {
                console.error('Error fetching saved clubs:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedClubs();
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
            <div className="saved-clubs-content-container">
                <BackButton/>
                <h1>Your Saved Clubs</h1>
                {clubs.length > 0 ? 
                    clubs.map((club) => (
                        <div key={club._id} className="savedclubs-clubcard">
                            <ClubInfoCard 
                                title={club.name}
                                description={club.description}
                                tags={club.tags}
                                major={club.major}
                                rating={club.overallRating}
                                time={club.timeCommitment}
                                application={club.application}
                                moreinfo={club.moreInfo || ''}
                                isSaved={true}
                                club_id={club._id}
                            />
                        </div>))
                    : <h1>Save some clubs to get started!</h1>
                }
            </div>
        </div>
    );
}

export default SavedClubs