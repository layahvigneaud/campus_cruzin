import { Link } from "react-router-dom"
import LogoutButton from './LogoutButton'
import HomeIcon from '../assets/home.svg';
import SavedIcon from '../assets/filledinbookmark.svg';
import ReviewIcon from '../assets/reviewbubble.svg';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div class="navbar">
            <div class="navbar-side-by-side">
                <div class="navbar-container">
                    <Link to="/review">
                        <button type="button">
                            <img src={ReviewIcon} />
                        </button>
                    </Link>
                    <Link to="/savedclubs">
                        <button type="button">
                            <img src={SavedIcon} />
                        </button>
                    </Link>
                    <Link to="/homepage">
                        <button type="button">
                            <img src={HomeIcon} />
                        </button>
                    </Link>
                </div>
                <div class="navbar-logout-button">
                    {
                        <LogoutButton />
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar