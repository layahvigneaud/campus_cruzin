import Star from '../assets/star.svg'
import '../styles/Rating.css';

function Rating({value}) {
    return (
        <div className="rating">
            {/* update rating using get request from database */}
            {value}.0
            <img src={Star}/>
        </div>
    );
}

export default Rating;