import './Other.css';
import { useEffect } from 'react';


const HiddenMessage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div className="context-page">
            <h2>Wanna go on a quest? &#x1F642;</h2>
            <p>I've hidden an easter egg somewhere in this web app. Get back to me when you find it!</p>
        </div>
    )
}

export default HiddenMessage;