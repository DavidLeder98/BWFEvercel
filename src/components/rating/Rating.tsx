import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as emptyStar } from '@fortawesome/free-solid-svg-icons';
import './Rating.css';

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Gets the number of full stars
    const hasHalfStar = rating % 1 !== 0; // Checks if there is a half-star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Calculates the number of empty stars

    const stars = [];

    // Adds full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="star full-star" />);
    }

    // Adds half star if applicable
    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="star half-star" />);
    }

    // Adds empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={emptyStar} className="star empty-star" />);
    }

    return stars;
};

export default renderStars;