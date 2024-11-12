import './Banner.css';
import spook from '../../assets/banners/spook.png';
import { Link } from 'react-router-dom';

const DealsBanner = () => {
    return (
        <div className="banner-container">
            <Link to="/deals">
                <img className="static-img" src={spook} />
            </Link>
        </div>
    )
}

export default DealsBanner;