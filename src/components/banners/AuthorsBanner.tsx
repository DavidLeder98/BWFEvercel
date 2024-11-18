import './Banner.css';
import bestsellers from '../../assets/banners/bestsellers.png';
import { Link } from 'react-router-dom';

const AuthorsBanner = () => {
    return (
        <div className="banner-container">
            <Link to="/bestsellers">
                <img className="static-img-l" src={bestsellers} />
            </Link>
        </div>
    )
}

export default AuthorsBanner;