import './Footer.css';
import { Link } from 'react-router-dom';
import emailIcon from '../../assets/icons/email.png';
import telIcon  from '../../assets/icons/telephone.png';
import locIcon  from '../../assets/icons/location.png';
import fbIcon  from '../../assets/icons/facebook.png';
import twIcon from '../../assets/icons/twitter.png';
import tgIcon from '../../assets/icons/telegram.png';
import igIcon from '../../assets/icons/instagram.png';


const Footer = () => {
    return(
        <div className="footer-positioner">
            <div className="footer-container">
                <div className="footer">
                    <div className="f-section">
                        <h4 className="f-h4">Contact</h4>
                        <ul className="f-ul">
                            <li><img className="fc-icon" src={emailIcon} />info@bookwyrm.store</li>
                            <li><img className="fc-icon" src={telIcon} />Tel: +1-700-743-8370</li>
                            <li><img className="fc-icon" src={locIcon} />Cinders Ave. 33.</li>
                            <li>99000</li>
                            <li>Mordor, Middle Earth</li>
                        </ul>
                    </div>
                    <div className="f-section">
                        <h4 className="f-h4">Information</h4>
                        <ul className="f-ul">
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/privacy">Privacy</Link></li>
                            <li><Link to="/hiddenmessage">Hidden Message</Link></li>
                        </ul>
                    </div>
                    <div className="f-section">
                        <h4 className="f-h4">Pages</h4>
                        <ul className="f-ul">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/bestsellers">Best Sellers</Link></li>
                            <li><Link to="/deals">Deals & Coupons</Link></li>
                            <li><Link to="/allbooks">All Products</Link></li>
                        </ul>
                    </div>
                    <div className="f-section">
                        <h4 className="f-h4">Socials</h4>
                        <ul className="f-ul row">
                            <li><Link to="/sorry"><img className="f-icon" src={fbIcon} ></img></Link></li>
                            <li><Link to="/sorry"><img className="f-icon" src={igIcon} ></img></Link></li>
                            <li><Link to="/sorry"><img className="f-icon" src={twIcon} ></img></Link></li>
                            <li><Link to="/sorry"><img className="f-icon" src={tgIcon} ></img></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;