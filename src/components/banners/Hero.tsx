import './Banner.css';
import hero from '../../assets/banners/herogreen.png';
import heromobile from '../../assets/banners/herogreenmobile.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero-container">
            <Link to="/deals">
                <img className="static-img-l" src={hero} />
                <img className="static-img-s" src={heromobile} />
            </Link>
        </div>
    )
}

export default Hero;