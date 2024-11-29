import { Link } from "react-router-dom"
import LogoutButton from './LogoutButton'
import HomeIcon from '../assets/home.svg';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div class="navbar">
            <div class="navbar-side-by-side">
                <Link to="/review">
                    <button type="button">Submit a Review!</button>
                </Link>
                <Link to="/savedclubs">
                    <button type="button">Your Saved Clubs</button>
                </Link>
                <Link to="/homepage">
                    <button type="button">
                        <img src={HomeIcon}/>
                    </button>
                </Link>
                <div class="navbar-logout-button"> {
                    <LogoutButton/>
                }
                </div>
            </div>
        </div>
    );
}

export default Navbar