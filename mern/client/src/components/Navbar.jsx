import { Link } from "react-router-dom"
import LogoutButton from './LogoutButton'
import HomeIcon from '../assets/home.svg';
import SavedIcon from '../assets/filledinbookmark.svg';
import ReviewIcon from '../assets/review.svg';
import SavedReviewIcon from '../assets/filledheart.svg';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-side-by-side">
                <div className="navbar-container">
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
                    <Link to="/savedreviews">
                        <button type="button">
                            <img src={SavedReviewIcon} />
                        </button>
                    </Link>
                    <Link to="/homepage">
                        <button type="button">
                            <img src={HomeIcon} />
                        </button>
                    </Link>
                </div>
                <div className="navbar-logout-button">
                    {
                        <LogoutButton />
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar