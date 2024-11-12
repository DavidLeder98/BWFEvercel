import '../../App.css';
import './Navbar.css';
import logo from '../../assets/icons/logo.png';
import cart from '../../assets/icons/cart.png';
import usericon from '../../assets/icons/usericon.png';
import downarrow from '../../assets/icons/downarrow.png';
import { Link } from 'react-router-dom';
import QuickSearchBar from '../quicksearch/QuickSearchBar';
import CategoriesDropdown from '../categoriesdropdown/CategoriesDropdown';
import { useAuth } from '../../services/account/AuthContext'; // Import the useAuth hook
import { useCartGuest } from '../../services/cart/CartContextGuest'; // Import the useCartGuest hook
import { useCartUser } from '../../services/cart/CartContextUser'; // Import the useCartUser hook
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { isAuthenticated, logout, username, role } = useAuth(); // Use the useAuth hook
    const { cartItems } = useCartGuest(); // Get cartItems from CartContextGuest
    const { booksInCart } = useCartUser(); // Get booksInCart from CartContextUser

    // Calculate the total quantity of items in the guest cart
    const guestCartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Calculate the total quantity of items in the user's cart
    const [userCartItemCount, setUserCartItemCount] = useState(0);

    useEffect(() => {
        // Calculate and set user cart count
        const count = booksInCart.reduce((total, item) => total + (localStorage.getItem(`quantity_${item.id}`) ? parseInt(localStorage.getItem(`quantity_${item.id}`)!) : 0), 0);
        setUserCartItemCount(count);
    }, [booksInCart]); // Depend on booksInCart

    // Handle logout click
    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function from context
            window.location.href = "/"; // Redirect to home or any other route after logout
        } catch (error) {
            console.error("Logout failed:", error); // Handle logout error
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
                                    <Link to="/admin" className="dropdown-item cna">Manage Content</Link> // Admin link
                                ) : (
                                    <Link to="/account" className="dropdown-item cna">Manage Account</Link> // Regular user link
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
                        <div className="nav-cart-count">{userCartItemCount > 0 ? userCartItemCount : '0'}</div> // User cart item count
                    ) : (
                        <div className="nav-cart-count">{guestCartItemCount > 0 ? guestCartItemCount : '0'}</div> // Guest cart item count
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
