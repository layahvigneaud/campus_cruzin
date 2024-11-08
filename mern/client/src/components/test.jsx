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
            <div className='text-muted mb-2'>
                Filters <span className='fas fa-sliders-h'></span>
            </div>
            <nav className= 'navbar navbar-expand-lg navbar-light bg-light'> <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button classNAme="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form></nav>
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