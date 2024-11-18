import './Banner.css';
import deals from '../../assets/banners/deals.png';
import dealsmobile from '../../assets/banners/dealsmobile.png';
import { Link } from 'react-router-dom';

const DealsBanner = () => {
    return (
        <div className="banner-container">
            <Link to="/deals">
                <img className="static-img-l" src={deals} />
                <img className="static-img-s" src={dealsmobile} />
            </Link>
        </div>
    )
}

export default DealsBanner;