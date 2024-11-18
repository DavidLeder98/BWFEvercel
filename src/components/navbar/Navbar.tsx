import '../../App.css';
import './Navbar.css';
import logo from '../../assets/icons/logo.png';
import cart from '../../assets/icons/cart.png';
import usericon from '../../assets/icons/usericon.png';
import downarrow from '../../assets/icons/downarrow.png';
import { Link } from 'react-router-dom';
import QuickSearchBar from '../quicksearch/QuickSearchBar';
import CategoriesDropdown from '../categoriesdropdown/CategoriesDropdown';
import { useAuth } from '../../services/account/AuthContext';
import { useCartGuest } from '../../services/cart/CartContextGuest';
import { useCartUser } from '../../services/cart/CartContextUser';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { isAuthenticated, logout, username, role } = useAuth();
    const { cartItems } = useCartGuest();
    const { booksInCart } = useCartUser();

    // Calculates the total quantity of items in the guest cart
    const guestCartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Calculates the total quantity of items in the user's cart
    const [userCartItemCount, setUserCartItemCount] = useState(0);

    useEffect(() => {
        // Calculates and set user cart count
        const count = booksInCart.reduce((total, item) => total + (localStorage.getItem(`quantity_${item.id}`) ? parseInt(localStorage.getItem(`quantity_${item.id}`)!) : 0), 0);
        setUserCartItemCount(count);
    }, [booksInCart]); // Dependent on booksInCart

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="navbar row">
            <div className="nav-logo-container">
                <Link to="/">
                    <img src={logo} alt="Book Wyrm logo" className="nav-logo" />
                </Link>
            </div>
            <ul className="nav-ul row">
                <li className="nav-li"><Link to="/">Home</Link></li>
                <div className="nav-cd-container">
                    <li className="nav-li">Categories</li>
                    <div className="nav-cd"><CategoriesDropdown /></div>
                </div>
                <li className="nav-li"><Link to="/deals">Deals & Coupons</Link></li>
                <li className="nav-li"><Link to="/bestsellers">Best Sellers</Link></li>
            </ul>
            <QuickSearchBar />
            <div className="login-and-cart-container row">
                <div className="login-navitem-container row">
                    <img src={usericon} alt="User icon" className="nav-mini-icon" />
                    <div className="nav-dropdown-account-option">My Account</div>
                    <img src={downarrow} alt="dropdown" className="nav-mini-icon" />
                    
                    <div className="account-dropdown">
                        {isAuthenticated ? (
                            <>
                                <p className="nav-username">{username}</p>
                                {role === 'Admin' ? (
                                    <Link to="/admin" className="dropdown-item cna">Manage Content</Link>
                                ) : (
                                    <Link to="/account" className="dropdown-item cna">Manage Account</Link>
                                )}
                                <Link to="#" onClick={handleLogout} className="dropdown-item lini">Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="dropdown-item lini">Login</Link>
                                <Link to="/register" className="dropdown-item cna">Create New Account</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="cart-icon-container">
                    <Link to="/cart">
                        <img src={cart} alt="Shopping cart icon" className="cart-icon" />
                    </Link>
                    {isAuthenticated ? (
                        <div className="nav-cart-count">{userCartItemCount > 0 ? userCartItemCount : '0'}</div>
                    ) : (
                        <div className="nav-cart-count">{guestCartItemCount > 0 ? guestCartItemCount : '0'}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
