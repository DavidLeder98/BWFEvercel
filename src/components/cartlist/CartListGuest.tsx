import { useState, useEffect } from 'react';
import './CartList.css';
import { Link } from 'react-router-dom';
import { useCartGuest } from '../../services/cart/CartContextGuest';
import { CartItemGuest } from '../../services/cart/CartContextGuest';
import wallet from '../../assets/icons/wallet.png';

const CartListGuest = () => {
    const { cartItems, removeFromCart, updateItemQuantity } = useCartGuest();
    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        // Calculate the total sum whenever cartItems change
        const sum = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalSum(sum);
    }, [cartItems]);

    const handleQuantityChange = (item: CartItemGuest, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(item.id); // Remove item if the new quantity is zero or less
        } else {
            // Remove the item and re-add it with the updated quantity
            updateItemQuantity(item.id, newQuantity);
        }
    };

    return (
        <div className="cart-list-container col">
            <h1 className="cl-h1">Items in Cart</h1>
            {cartItems.length === 0 ? (
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
                        {cartItems.map(item => (
                            <tr key={item.id} className="cl-bot">
                                <td>
                                    <img src={item.imageUrl} alt={item.title} className="cl-img" />
                                </td>
                                <td>
                                    <div className="cl-title">{item.title}</div>
                                    <div className="cl-author">By {item.authorName}</div>
                                </td>
                                <td className="cl-list-price">${item.listPrice.toFixed(2)}</td>
                                <td className="cl-price">${item.price.toFixed(2)}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                        className="cl-input"
                                    />
                                </td>
                                <td className="cl-total">${(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button className="cl-remove" onClick={() => removeFromCart(item.id)}>
                                        <b>X</b> Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4}></td>
                            <td className="cl-sum">Sum Total:</td>
                            <td className="cl-sum">${totalSum.toFixed(2)}</td>
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

export default CartListGuest;