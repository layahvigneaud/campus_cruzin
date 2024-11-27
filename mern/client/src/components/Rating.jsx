import Star from '../assets/star.svg'
import '../styles/Rating.css';

function Rating() {
    return (
        <div className="rating">
            {/* update rating using get request from database */}
            5.0
            <img src={Star}/>
        </div>
    );
}

export default Rating;