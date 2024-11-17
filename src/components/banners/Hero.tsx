import './Banner.css';
import hero from '../../assets/banners/herogreen.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero-container">
            <Link to="/deals">
                <img className="static-img" src={hero} />
            </Link>
        </div>
    )
}

export default Hero;