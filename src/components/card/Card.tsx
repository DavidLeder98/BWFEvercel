import './Card.css';
import bestseller from '../../assets/icons/bestseller.png';
import { BookCardDto } from '../../services/book/BookCardDto';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { useCartGuest } from '../../services/cart/CartContextGuest';
import { useCartUser } from '../../services/cart/CartContextUser';
import { useAuth } from '../../services/account/AuthContext';

interface ItemProps {
    book: BookCardDto;
    showNotification: () => void; // Add this line
}

const Card = ({ book, showNotification }: ItemProps) => { 
    const { addToCart: addToCartGuest } = useCartGuest();
    const { booksInCart, updateBooksInCart } = useCartUser(); // Fetch booksInCart from CartContextUser
    const { username } = useAuth(); // Check if user is logged in

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const handleAddToCart = () => {
        const cartItemId = book.id;
    
        interface CartItem {
            id: number;
            title: string;
            rating: number;
            bestSeller: boolean;
            listPrice: number;
            price: number;
            imageUrl: string;
            authorName: string;
            quantity: number;
        }
    
        // Check if the book is already in the user's cart
        const isInUserCart = username && booksInCart.some((item: BookCardDto) => item.id === cartItemId);
        // Check if the book is already in the guest cart
        const guestCart: CartItem[] = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const isInGuestCart = !username && guestCart.some((item: CartItem) => item.id === cartItemId);
    
        if (isInUserCart || isInGuestCart) {
            console.log('This book is already in your cart.'); // Provides feedback to the user
            return; // Exits early if the item is already in the cart
        }
    
        const cartItem: CartItem = {
            id: cartItemId,
            title: book.title,
            rating: book.rating,
            bestSeller: book.bestSeller,
            listPrice: book.listPrice,
            price: book.price,
            imageUrl: book.imageUrl,
            authorName: book.authorName,
            quantity: 1
        };
    
        if (username) {
            // If logged in, add to user's cart (database)
            updateBooksInCart([...booksInCart.map(book => book.id), cartItem.id]); 
        } else {
            // If not logged in, add to guest cart
            addToCartGuest(cartItem);
        }
    
        showNotification();
    };

    return (
        <div className="card">
            <Link to={`/book/${book.id}`} className="card-link">
                <div className="best-seller-container">
                    {book.bestSeller && (
                        <img src={bestseller} alt="Bestseller" className="bestseller-img" />
                    )}
                </div>
                <div className="to-card-details">
                    <div className="img-container">
                        <img src={book.imageUrl} className="card-img" alt={book.title} />
                    </div>
                    <div className="card-info-container">
                        <p className="card-title">{book.title}</p>
                        <p className="card-author">{book.authorName}</p>
                        <div className="price-container">
                            <p className="card-price">{formatCurrency(book.price)}</p>
                            <p className="card-list-price">{formatCurrency(book.listPrice)}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="card-button-container">
                <Button text="+ Add to cart" onClick={handleAddToCart} variant="filled" color="red" />
            </div>
        </div>
    );
};

export default Card;