import './Other.css';
import egg from '../../assets/other/egg.mp4';
import { useEffect } from 'react';

const Boring = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div className="context-page">
            <h1>&#x1F389; Congratulations! &#x1F389;</h1>
            <h1>You found the easter egg!</h1>
            <div className="vid-positioner">
                <video 
                    className="easter-egg-video" 
                    src={egg} 
                    autoPlay 
                    loop 
                    controls
                />
            </div>
        </div>
    )
}

export default Boring;