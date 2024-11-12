import './NavMobile.css';
import burger from '../../assets/icons/burger.png';
import logo from '../../assets/icons/logo.png';
import cart from '../../assets/icons/cart.png';
import QuickSearchBar from '../quicksearch/QuickSearchBar';
import CategoriesDropdown from '../categoriesdropdown/CategoriesDropdown';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../services/account/AuthContext';
import { useCartGuest } from '../../services/cart/CartContextGuest';
import { useCartUser } from '../../services/cart/CartContextUser';

const NavMobile = () => {
    const { isAuthenticated, logout, username, role } = useAuth();
    const { cartItems } = useCartGuest();
    const { booksInCart } = useCartUser();

    const guestCartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const userCartItemCount = booksInCart.reduce(
        (total, item) => total + (localStorage.getItem(`quantity_${item.id}`) ? parseInt(localStorage.getItem(`quantity_${item.id}`)!) : 0),
        0
    );

    const [menuOpen, setMenuOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const burgerRef = useRef<HTMLDivElement | null>(null);
    const categoriesRef = useRef<HTMLLIElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const toggleCategories = () => {
        setCategoriesOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const closeMenuOnLinkClick = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Handle menu close
            if (
                menuRef.current &&
                !menuRef.current.contains(target) &&
                burgerRef.current &&
                !burgerRef.current.contains(target)
            ) {
                setMenuOpen(false);
            }

            // Handle categories dropdown close, excluding menu links
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(target) &&
                categoriesRef.current &&
                !categoriesRef.current.contains(target) &&
                !(target as HTMLElement).closest('.mobile-nav-li') // Ignore clicks on nav links
            ) {
                setCategoriesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="nav-mobile">
            <div className="nm-visible">
                <div className="nm-top">
                    <div className="burger-container" onClick={toggleMenu} ref={burgerRef}>
                        <img className="burger" src={burger} alt="Menu" />
                    </div>
                    <div className="mobile-logo-container">
                        <Link to="/">
                            <img className="mobile-logo" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="mobile-cart-container">
                        <Link to="/cart">
                            <img className="cart-icon" src={cart} alt="Shopping cart" />
                        </Link>
                        <div className="nav-cart-count">{isAuthenticated ? userCartItemCount : guestCartItemCount}</div>
                    </div>
                </div>
                <div className="mobile-qsb-container">
                    <QuickSearchBar />
                </div>
            </div>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
                <ul className="mobile-nav-ul">
                    <div className="mn-login-group">
                        {isAuthenticated ? (
                            <>
                                <p className="mnlg-username"><b>{username}</b></p>
                                {role === 'Admin' ? (
                                    <Link to="/admin" className="mnlg-item" onClick={closeMenuOnLinkClick}>Manage Content</Link>
                                ) : (
                                    <Link to="/account" className="mnlg-item" onClick={closeMenuOnLinkClick}>Manage Account</Link>
                                )}
                                <Link to="#" className="mnlg-item" onClick={handleLogout}>Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mnlg-item" onClick={closeMenuOnLinkClick}>Login</Link>
                                <Link to="/register" className="mnlg-item" onClick={closeMenuOnLinkClick}>Register</Link>
                            </>
                        )}
                    </div>
                    <li className="mobile-nav-li mncd" onClick={toggleCategories} ref={categoriesRef}>
                        Categories
                    </li>
                    {categoriesOpen && (
                        <div className="mn-cdd" ref={dropdownRef}>
                            <CategoriesDropdown />
                        </div>
                    )}
                    <Link to="/" onClick={closeMenuOnLinkClick}><li className="mobile-nav-li">Home</li></Link>
                    <Link to="/deals" onClick={closeMenuOnLinkClick}><li className="mobile-nav-li">Deals & Coupons</li></Link>
                    <Link to="/bestsellers" onClick={closeMenuOnLinkClick}><li className="mobile-nav-li">Best Sellers</li></Link>
                    <Link to="/about" onClick={closeMenuOnLinkClick}><li className="mobile-nav-li">About</li></Link>
                </ul>
            </div>
        </div>
    );
};

export default NavMobile;