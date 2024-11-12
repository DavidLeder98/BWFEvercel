import './AdminPanel.css';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="admin-panel-container col">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Manage Content</h1>
                </div>
                <ul className="ap-types">
                    <Link to="/admin/category">
                        <div className="apt-li-container">
                            <li className="apt-li">Manage Categories</li>
                        </div>
                    </Link>
                    <Link to="/admin/author">
                        <div className="apt-li-container">
                            <li className="apt-li">Manage Authors</li>
                        </div>
                    </Link>
                    <Link to="/admin/book">
                        <div className="apt-li-container">
                            <li className="apt-li">Manage Books</li>
                        </div>
                    </Link>
                    <Link to="/admin/bundle">
                        <div className="apt-li-container">
                            <li className="apt-li">Manage Bundles</li>
                        </div>
                    </Link>
                </ul>
                <div className="ap-btn-back-container">
                    <Link to="/">
                        <div className="ap-btn-back">
                            <p>Home</p>
                        </div>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default AdminPanel;