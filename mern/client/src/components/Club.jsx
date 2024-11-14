import Navbar from './Navbar';
import React, { useState } from 'react';
import SaveButton from './SaveButton';
import Rating from './Rating';
import ReviewCard from './ReviewCard';
import '../styles/Club.css';

function Club() {
    const [filterRating, setFilterRating] = useState('');

    const handleChangeFilter = event => {
        setFilterRating(event.target.value);
    }

    return (
        <div>
            <Navbar/>
            <div className="content-container">
                <div className="club-info-container">
                    <SaveButton className="save-button"/>
                    <div>
                        <h1>ACM Teach LA</h1>
                        <p>ACM Teach LA pairs UCLA students with schools in  Los Angeles to provide free computer science classes. Their goal is to  empower all students with the ability to code, and use it to make a  difference.</p>
                        <Rating className="rating"/>
                    </div>
                    <div>
                        <p>
                            ACM Teach LA features two main teams: 
                            <br/>
                            1. The development team, whose members create learning labs for the schools that Teach LA services.
                            
                            2. The curriculum team, whose members teach computer science to local Los Angeles schools on a weekly basis. 
                        </p>
                        <p id="descriptors">
                            <strong>Targeted majors:</strong> Computer Science
                            <br/>
                            
                            <strong>Category:</strong> Social good
                            <br/>
                            
                            <strong>Time commitment:</strong> &lt;5 hours/week
                            <br/>
                            
                            <strong>Application Required?:</strong> No
                            <br/>
                            
                            <strong>Currently Open to Join?:</strong> Yes
                        </p>
                    </div>
                </div>
                <div className="review-container">
                    <h3>Reviews</h3>
                    <div className="review-nav-bar">
                        <select
                            name="rating-filter"
                            value={filterRating}
                            onChange={handleChangeFilter}
                            id="rating-filter"
                        >
                            <option value="5.0">5.0 stars</option>
                            <option value="4.5">4.5 stars</option>
                            <option value="4.0">4.0 stars</option>
                            <option value="3.5">3.5 stars</option>
                            <option value="3.0">3.0 stars</option>
                            <option value="2.5">2.5 stars</option>
                            <option value="2.0">2.0 stars</option>
                            <option value="1.5">1.5 stars</option>
                            <option value="1.0">1.0 stars</option>
                            <option value="0.5">0.5 stars</option>
                            <option value="0.0">0.0 stars</option>
                        </select>
                        <button className="review-submit-button">Submit a Review!</button>
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