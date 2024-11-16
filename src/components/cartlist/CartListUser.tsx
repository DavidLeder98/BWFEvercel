import './CartList.css';
import { Link } from 'react-router-dom';
import { useCartUser } from '../../services/cart/CartContextUser';
import wallet from '../../assets/icons/wallet.png';
import { useEffect, useState } from 'react';
import useMediaQuery from '../../services/cart/UseMediaQuery';

const CartListUser = () => {
    const { booksInCart, updateBooksInCart } = useCartUser();
    const [localBooksInCart, setLocalBooksInCart] = useState(booksInCart);
    const isLargeScreen = useMediaQuery('(min-width: 901px)');

    // Update local cart state when booksInCart changes
    useEffect(() => {
        setLocalBooksInCart(booksInCart);
    }, [booksInCart]);

    // Fetch quantity from localStorage
    const getQuantity = (id: number) => parseInt(localStorage.getItem(`quantity_${id}`) || '1', 10);

    // This function will handle removing an item from the cart
    const handleRemove = (id: number) => {
        const updatedBooks = localBooksInCart.filter(book => book.id !== id);
        setLocalBooksInCart(updatedBooks);
        updateBooksInCart(updatedBooks.map(book => book.id));
        localStorage.removeItem(`quantity_${id}`);
    };

    // This function will handle quantity changes
    const handleQuantityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1); // Default to 1 if input is invalid
        localStorage.setItem(`quantity_${id}`, newQuantity.toString());
        setLocalBooksInCart(prevBooks =>
            prevBooks.map(book => (book.id === id ? { ...book } : book))
        );
    };

    // Calculate total price based on quantity in localStorage
    const totalPrice = localBooksInCart.reduce((sum, book) => {
        const quantity = getQuantity(book.id);
        return sum + book.price * quantity;
    }, 0).toFixed(2);

    const renderLargeTable = () => (
        <table className="cl-table">
            <thead>
                <tr className="cl-top">
                    <th></th>
                    <th>Title & Author</th>
                    <th>List Price</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {localBooksInCart.map(book => {
                    const quantity = getQuantity(book.id);
                    return (
                        <tr className="cl-bot" key={book.id}>
                            <td>
                                <img className="cl-img" src={book.imageUrl} alt={book.title} />
                            </td>
                            <td>
                                <div className="cl-title">{book.title}</div>
                                <div className="cl-author">By {book.authorName}</div>
                            </td>
                            <td className="cl-list-price">${book.listPrice.toFixed(2)}</td>
                            <td className="cl-price">${book.price.toFixed(2)}</td>
                            <td>
                                <input
                                    type="number"
                                    value={quantity}
                                    min={1}
                                    onChange={(event) => handleQuantityChange(book.id, event)}
                                    className="cl-input"
                                />
                            </td>
                            <td className="cl-total">${(book.price * quantity).toFixed(2)}</td>
                            <td>
                                <button className="cl-remove" onClick={() => handleRemove(book.id)}>
                                    <b>X </b> Remove
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="cl-sum">Sum Total:</td>
                    <td className="cl-sum">${totalPrice}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );

    const renderSmallTable = () => (
        <div className="cl-table">
            {localBooksInCart.map(book => {
                const quantity = getQuantity(book.id);
                return (
                    <div className="cl-row" key={book.id}>
                        <div className="cl-item">
                            <img className="cl-img" src={book.imageUrl} alt={book.title} />
                            <div>
                                <div className="cl-title">{book.title}</div>
                                <div className="cl-author">By {book.authorName}</div>
                            </div>
                        </div>
                        <div className="cl-details">
                            <div>List Price: ${book.listPrice.toFixed(2)}</div>
                            <div>Price: ${book.price.toFixed(2)}</div>
                            <div>
                                Quantity:
                                <input
                                    type="number"
                                    value={quantity}
                                    min={1}
                                    onChange={(event) => handleQuantityChange(book.id, event)}
                                    className="cl-input"
                                />
                            </div>
                            <div>Total: ${(book.price * quantity).toFixed(2)}</div>
                        </div>
                        <button className="cl-remove" onClick={() => handleRemove(book.id)}>
                            <b>X </b> Remove
                        </button>
                    </div>
                );
            })}
            <div className="cl-summary">
                <div>Sum Total: ${totalPrice}</div>
            </div>
        </div>
    );

    return (
        <div className="cart-list-container col">
            <h1 className="cl-h1">Items in Cart</h1>
            {localBooksInCart.length === 0 ? (
                <p className="cl-empty">Your cart is empty.</p>
            ) : isLargeScreen ? (
                renderLargeTable()
            ) : (
                renderSmallTable()
            )}
            <div className="purchase-container">
                <Link to="/sorry">
                    <div className="purchase-btn">
                        <img src={wallet} alt="Wallet icon" />
                        <p>Move to Checkout</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CartListUser;