import './PageEnd.css';
import { Link } from 'react-router-dom';

const BtnProducts = () => {
    return (
        <div className="btn-view-products-container">
            <Link to="/allbooks">
                <div className="btn-redirect">
                    <p>View All Products</p>
                </div>
            </Link>
        </div>
    )
}

export default BtnProducts;