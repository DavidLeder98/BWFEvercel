import './CartList.css';
import { Link } from 'react-router-dom';
import { useCartUser } from '../../services/cart/CartContextUser';
import wallet from '../../assets/icons/wallet.png';
import { useEffect, useState } from 'react';

const CartListUser = () => {
    const { booksInCart, updateBooksInCart } = useCartUser();
    const [localBooksInCart, setLocalBooksInCart] = useState(booksInCart);

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

    return (
        <div className="cart-list-container col">
            <h1 className="cl-h1">Items in Cart</h1>
            {localBooksInCart.length === 0 ? (
                <p className="cl-empty">Your cart is empty.</p>
            ) : (
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
                                    <div className="cl-md-top">
                                        <td>
                                            <img className="cl-img" src={book.imageUrl} alt={book.title} />
                                        </td>
                                        <td>
                                            <div className="cl-title">{book.title}</div>
                                            <div className="cl-author">By {book.authorName}</div>
                                        </td>
                                    </div>
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