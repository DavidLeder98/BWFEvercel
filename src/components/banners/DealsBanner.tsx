import './Banner.css';
import deals from '../../assets/banners/deals.png';
import { Link } from 'react-router-dom';

const DealsBanner = () => {
    return (
        <div className="banner-container">
            <Link to="/deals">
                <img className="static-img-l" src={deals} />
            </Link>
        </div>
    )
}

export default DealsBanner;