import { useEffect, useState } from "react";
import { getBookById } from "../../services/book/BookService";
import { BookDetailsDto } from "../../services/book/BookDetailsDto";
import './BookDetails.css';
import { Link } from "react-router-dom";
import renderStars from "../rating/Rating";
import Button from "../button/Button";
import { useCartGuest } from "../../services/cart/CartContextGuest";
import { useCartUser } from "../../services/cart/CartContextUser";
import { useAuth } from "../../services/account/AuthContext";

interface BookDetailsProps {
    bookId: number;
}

const BookDetails: React.FC<BookDetailsProps> = ({ bookId }) => {
    const [bookDetails, setBookDetails] = useState<BookDetailsDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string>('');
    const { addToCart: addToCartGuest } = useCartGuest(); // Uses the cart context for guests
    const { booksInCart, updateBooksInCart } = useCartUser(); // Uses the cart context for users
    const { username } = useAuth(); // Checks if user is logged in

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const fetchedBookDetails = await getBookById(bookId);
                setBookDetails(fetchedBookDetails);
            } catch (error) {
                setError("Failed to fetch book details");
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [bookId]); // Dependency array includes bookId

    const showNotification = () => {
        setNotification('Item added to cart successfully');
        setTimeout(() => setNotification(''), 3000); // Clears after 3 seconds
    };

    // Renders loading state, error message, or book details
    if (error) {
        return <div>{error}</div>;
    }

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    // handle adding the book to the cart
    const handleAddToCart = (quantity: number) => {
        if (bookDetails) {
            const cartItemId = bookDetails.id;
    
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
    
            // Checks if the book is already in the user's cart
            const isInUserCart = username && booksInCart.some((item) => item.id === cartItemId); // Assuming booksInCart is of type BookCardDto
            // Checks if the book is already in the guest cart
            const guestCart: CartItem[] = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const isInGuestCart = !username && guestCart.some((item: CartItem) => item.id === cartItemId);
    
            if (isInUserCart || isInGuestCart) {
                console.log('This book is already in your cart.'); // Provide feedback to the user
                return; // Exits early if the item is already in the cart
            }
    
            const cartItem: CartItem = {
                id: cartItemId,
                title: bookDetails.title,
                rating: bookDetails.rating,
                bestSeller: bookDetails.bestSeller,
                listPrice: bookDetails.listPrice,
                price: bookDetails.price,
                imageUrl: bookDetails.largeImageUrl,
                authorName: bookDetails.authorName,
                quantity: quantity,
            };
    
            if (username) {
                // If logged in, adds to user's cart (database)
                updateBooksInCart([...booksInCart.map(book => book.id), cartItem.id]);
            } else {
                // If not logged in, adds to guest cart
                addToCartGuest(cartItem);
            }
    
            showNotification();
        }
    };

    return (
        <div className="book-details-container">
            <div className="bd-left">
                <div className="bd-image-container">
                    <img src={bookDetails.largeImageUrl} alt={bookDetails.title} className="bd-image" />
                    {bookDetails.bestSeller && (
                        <h2 className="bd-best-seller"><Link to={`/bestsellers/`}>BEST SELLER</Link></h2>
                    )}
                </div>
                <div className="bd-categories col">
                    <h3 className="fw-400">Categories:</h3>
                    <ul className="bd-categories-ul">
                        {bookDetails.categories.map((category) => (
                            <Link to={`/category/${category.id}`} key={category.id} className="bd-categories-li">
                                <li>{category.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bd-right">
                <div>
                    <h1 className="fw-400 allcaps bd-title">{bookDetails.title}</h1>
                    <h2 className="fw-400 bd-author">By: <Link to={`/author/${bookDetails.authorId}`}>{bookDetails.authorName}</Link></h2>
                    <p>{renderStars(bookDetails.rating)} {bookDetails.rating} </p>
                </div>
                <div className="filler-material">
                    <p>Publisher: BOOK WYRM INC.</p>
                    <p>ISBN: 1234567890123</p>
                    <p>Product Code: 123456789012</p>
                </div>
                <div className="bd-description">
                    <h3>Description: </h3>
                    <p>{bookDetails.description}</p>
                </div>
                <div className="bd-price-container">
                    <p className="bd-listprice">List Price: ${bookDetails.listPrice}</p>
                    <p className="bd-price">Price: ${bookDetails.price}</p>
                </div>
                <div className="to-cart-container">
                    <input 
                        type="number" 
                        className="to-cart-number" 
                        min="1" 
                        defaultValue="1" 
                        onChange={(e) => {
                            if (parseInt(e.target.value) < 1) {
                                e.target.value = "1";
                            }
                        }}
                    />
                    <Button 
                        text="+ Add to cart" 
                        onClick={() => {
                            const quantity = parseInt((document.querySelector('.to-cart-number') as HTMLInputElement).value);
                            handleAddToCart(quantity);
                        }} 
                        variant="filled" 
                        color="red" 
                    />
                </div>
                {notification && <div className="notification">{notification}</div>}
            </div>
        </div>
    );
};

export default BookDetails;
