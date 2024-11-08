import { Link } from "react-router-dom"

function SignupButton() {
    return (
    <Link to="/signup">
        <button type="button">Sign Up</button>
    </Link>
    );
}

export default SignupButton