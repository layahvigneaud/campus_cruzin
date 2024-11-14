import Star from '../assets/star.svg'
import '../styles/Rating.css';

function Rating() {
    function handleClick() {
        {/* bring to ratings page */}
    }
    return (
        <button onClick={ handleClick } className="rating">
            {/* update rating using get request from database */}
            5.0
            <img src={Star}/>
        </button>
    );
}

export default Rating;