import Star from '../assets/star.svg'
import '../styles/Rating.css';

function Rating({value}) {
    value = Math.floor(value) === 0 ? "N/A" : value;
    return (
        <div className="rating">
            {/* update rating using get request from database */}
            {value}
            <img src={Star}/>
        </div>
    );
}

export default Rating;