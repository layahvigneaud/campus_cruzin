import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Club() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getClubs = async () => {
            try {
                //retrieve clubs from clubs/populate routing
                const response = await axios.get('http://localhost:3001/clubs/populate');
                setClubs(response.data); //store in react state
                setLoading(false);
            }
            catch (error) {
                //catch errors and output
                console.error('Error fetching clubs:', error);
                setError('Failed to load clubs');
                setLoading(false);
            }
        }
        getClubs();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar/>
            <h1>CLUBS:</h1>
            <div>
                {clubs.map(club => (
                    <div key={club._id}>
                        <h3>{club.name}</h3>
                        <p>{club.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Club