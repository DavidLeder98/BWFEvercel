import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; 
import { getBundle } from '../../services/bundle/BundleService';
import { BundleWithBooksDto } from '../../services/bundle/BundleWithBooksDto';
import Card from '../card/Card';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './Bundle.css';
import prevarrow from '../../assets/icons/prevarrow.png';
import nextarrow from '../../assets/icons/nextarrow.png';

interface BundleProps {
    id: number;
}

const Bundle: React.FC<BundleProps> = ({ id }) => {
    const [bundle, setBundle] = useState<BundleWithBooksDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string>(''); // Notification state

    useEffect(() => {
        const fetchBundle = async () => {
            try {
                const data = await getBundle(id);
                setBundle(data);
            } catch (error) {
                setError('Failed to load bundle');
                console.error(error);
            }
        };

        fetchBundle();
    }, [id]);

    // Function to show notification
    const showNotification = () => {
        setNotification('Item added to cart successfully');
        setTimeout(() => setNotification(''), 3000); // Clear after 3 seconds
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!bundle) {
        return <div>Loading...</div>;
    }

    // Custom Previous Arrow Component
    const PrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={`${className} prev-arrow`} onClick={onClick}>
                <img src={prevarrow} alt="Previous" />
            </div>
        );
    };

    // Custom Next Arrow Component
    const NextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div className={`${className} next-arrow`} onClick={onClick}>
                <img src={nextarrow} alt="Next" />
            </div>
        );
    };

    // Settings for the slider
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        centerMode: true,
        prevArrow: <PrevArrow />, 
        nextArrow: <NextArrow />, 
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            }
        ],
    };

    return (
        <div className="bundle-container">
            <h1>{bundle.name}</h1>
            <Slider {...settings}>
                {bundle.books.map((book) => (
                    <div key={book.id}>
                        <Card book={book} showNotification={showNotification} />
                    </div>
                ))}
            </Slider>
            {notification && <div className="notification">{notification}</div>} {/* Render notification in Bundle */}
        </div>
    );
};

export default Bundle;