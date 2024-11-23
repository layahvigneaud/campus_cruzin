import { Link } from "react-router-dom"
import LogoutButton from './LogoutButton'
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div class="navbar">
            <div class="navbar-side-by-side">
                <Link to="/review">
                    <button type="button">Submit a Review!</button>
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