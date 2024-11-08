import { Link } from "react-router-dom"
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div class="navbar">
            <Link to="/review">
                <button type="button" class="">Submit a Review!</button>
            </Link>
            <Link to="/register">
                <button type="button" class="">Sign Up</button>
            </Link>
            <Link to="/login">
                <button type="button" class="">Log-in</button>
            </Link>
        </div>
    );
}

export default Navbar