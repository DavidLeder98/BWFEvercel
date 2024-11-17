import './Banner.css';
import authorsbanner from '../../assets/banners/authors.png';
import { Link } from 'react-router-dom';

const AuthorsBanner = () => {
    return (
        <div className="banner-container">
            <Link to="/bestsellers">
                <img className="static-img-l" src={authorsbanner} />
            </Link>
        </div>
    )
}

export default AuthorsBanner;