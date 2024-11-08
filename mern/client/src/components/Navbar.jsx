import { Link } from "react-router-dom"
import LogoutButton from './LogoutButton'

function Navbar() {
    return (
        <div class="navbar">
            <Link to="/review">
                <button type="button">Submit a Review!</button>
            </Link>
            <LogoutButton/>
        </div>
    );
}

export default Navbar