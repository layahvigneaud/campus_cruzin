import Navbar from './Navbar';
import { Link } from "react-router-dom";

function SearchPage() {
    return (
        <div class="clubs">
            <Navbar/>
                <div class="club-cards">
                    <div class="card-body">
                        <Link to='/clubname'>
                            <h2 class="card-title">Club Name</h2>
                        </Link>
                        <p class="card-text">This is a short description of the card content.</p>
                    </div>
                </div>
        </div>
    );
}

export default SearchPage