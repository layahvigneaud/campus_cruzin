import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../assets/arrow.svg';
import '../styles/BackButton.css';
function BackButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <button onClick={ handleClick } className="back-button">
            <img src={ ArrowIcon } alt="An arrow pointing left" /> 
            Back
        </button>
    );
}

export default BackButton;