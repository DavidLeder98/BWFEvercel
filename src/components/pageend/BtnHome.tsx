import './PageEnd.css';
import { Link } from 'react-router-dom';

const BtnHome = () => {
    return (
        <div className="btn-home-container">
            <Link to="/">
                <div className="btn-redirect">
                    <p>Back to Home Page</p>
                </div>
            </Link>
        </div>
    )
}

export default BtnHome;