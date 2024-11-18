import './Banner.css';
import bestsellers from '../../assets/banners/bestsellers.png';
import bestsellersmobile from '../../assets/banners/bestsellersmobile.png';
import { Link } from 'react-router-dom';

const AuthorsBanner = () => {
    return (
        <div className="banner-container">
            <Link to="/bestsellers">
                <img className="static-img-l" src={bestsellers} />
                <img className="static-img-s" src={bestsellersmobile} />
            </Link>
        </div>
    )
}

export default AuthorsBanner;