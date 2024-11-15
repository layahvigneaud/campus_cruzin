import Navbar from './Navbar';
import ClubInfoCard from './ClubInfoCard';
import '../styles/SavedClubs.css';

function SavedClubs() {
    return (
        <div>
            <Navbar/>
            <div className="content-container">
                <h1>Your Saved Clubs</h1>
                <ClubInfoCard/>
                <ClubInfoCard/>
                <ClubInfoCard/>
                <ClubInfoCard/>
                <ClubInfoCard/>
                <ClubInfoCard/>
            </div>
        </div>
    );
}

export default SavedClubs