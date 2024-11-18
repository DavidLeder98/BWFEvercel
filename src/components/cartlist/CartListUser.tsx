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

    // Updates local cart state when booksInCart changes
    useEffect(() => {
        setLocalBooksInCart(booksInCart);
    }, [booksInCart]);

    // Fetches quantity from localStorage
    const getQuantity = (id: number) => parseInt(localStorage.getItem(`quantity_${id}`) || '1', 10);

    const handleRemove = (id: number) => {
        const updatedBooks = localBooksInCart.filter(book => book.id !== id);
        setLocalBooksInCart(updatedBooks);
        updateBooksInCart(updatedBooks.map(book => book.id));
        localStorage.removeItem(`quantity_${id}`);
    };

    const handleQuantityChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1); // Defaults to 1 if input is invalid
        localStorage.setItem(`quantity_${id}`, newQuantity.toString());
        setLocalBooksInCart(prevBooks =>
            prevBooks.map(book => (book.id === id ? { ...book } : book))
        );
    };

    // Calculates total price based on quantity in localStorage
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
                    <div className="cl-bot" key={book.id}>
                        <div className="cl-itap">
                            <img className="cl-img" src={book.imageUrl} alt={book.title} />
                            <div className="cl-tap">
                                <div className="cl-title">{book.title}</div>
                                <div className="cl-author">By {book.authorName}</div>
                                <div className="cl-list-price">List Price: ${book.listPrice.toFixed(2)}</div>
                                <div className="cl-price">Price: ${book.price.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="cl-bit">
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
                            <button className="cl-remove" onClick={() => handleRemove(book.id)}>
                                <p><b>X </b> Remove</p>
                            </button>
                        </div>
                    </div>
                );
            })}
            <div className="cl-sum">
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