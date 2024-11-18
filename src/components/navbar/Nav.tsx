import Navbar from './Navbar';
import NavMobile from './NavMobile';
import { useState, useEffect } from 'react';

const Nav = () => {
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1200);
    };

    useEffect(() => {
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Adds resize event listener
        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);

    return(
        <div>
            {isMobile ? <NavMobile /> : <Navbar />}
        </div>
    )
}

export default Nav;