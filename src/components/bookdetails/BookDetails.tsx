import { useEffect, useState } from "react";
import { getBookById } from "../../services/book/BookService";
import { BookDetailsDto } from "../../services/book/BookDetailsDto";
import './BookDetails.css';
import { Link } from "react-router-dom";
import renderStars from "../rating/Rating";
import Button from "../button/Button";
import { useCartGuest } from "../../services/cart/CartContextGuest"; // Import the useCart hook
import { useCartUser } from "../../services/cart/CartContextUser"; // Import user cart context
import { useAuth } from "../../services/account/AuthContext"; // Import auth context

// Define the props interface
interface BookDetailsProps {
    bookId: number; // bookId should be a number
}

const BookDetails: React.FC<BookDetailsProps> = ({ bookId }) => {
    const [bookDetails, setBookDetails] = useState<BookDetailsDto | null>(null); // State to hold book details
    const [error, setError] = useState<string | null>(null); // State to hold error message
    const [notification, setNotification] = useState<string>(''); // State for notification message
    const { addToCart: addToCartGuest } = useCartGuest(); // Use the cart context for guests
    const { booksInCart, updateBooksInCart } = useCartUser(); // Use the cart context for users
    const { username } = useAuth(); // Check if user is logged in

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

        fetchBookDetails(); // Call the fetch function
    }, [bookId]); // Dependency array includes bookId

    // Function to show notification
    const showNotification = () => {
        setNotification('Item added to cart successfully');
        setTimeout(() => setNotification(''), 3000); // Clear after 3 seconds
    };

    // Render loading state, error message, or book details
    if (error) {
        return <div>{error}</div>;
    }

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    // Function to handle adding the book to the cart
    const handleAddToCart = (quantity: number) => {
        if (bookDetails) {
            const cartItemId = bookDetails.id;
    
            // Define a type for the cart items
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
            const isInUserCart = username && booksInCart.some((item) => item.id === cartItemId); // Assuming booksInCart is of type BookCardDto
            // Check if the book is already in the guest cart
            const guestCart: CartItem[] = JSON.parse(localStorage.getItem('guestCart') || '[]');
            const isInGuestCart = !username && guestCart.some((item: CartItem) => item.id === cartItemId);
    
            if (isInUserCart || isInGuestCart) {
                console.log('This book is already in your cart.'); // Provide feedback to the user
                return; // Exit early if the item is already in the cart
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
                // If logged in, add to user's cart (database)
                updateBooksInCart([...booksInCart.map(book => book.id), cartItem.id]);
            } else {
                // If not logged in, add to guest cart
                addToCartGuest(cartItem);
            }
    
            showNotification(); // Call to show the notification
        }
    };

    return (
        <div className="book-details-container row">
            <div className="bd-left">
                <div className="bd-image-container">
                    <img src={bookDetails.largeImageUrl} alt={bookDetails.title} className="bd-image" />
                    {bookDetails.bestSeller && (
                        <h2 className="bd-best-seller"><Link to={`/bestsellers/`}>BEST SELLER!</Link></h2>
                    )}
                </div>
                <div className="bd-categories col">
                    <h3 className="fw-400">Categories:</h3>
                    <ul className="bd-categories-ul row">
                        {bookDetails.categories.map((category) => (
                            <Link to={`/category/${category.id}`} key={category.id} className="bd-categories-li">
                                <li>{category.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bd-right col">
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
                                e.target.value = "1"; // Ensure the value doesn't go below 1
                            }
                        }}
                    />
                    <Button 
                        text="+ Add to cart" 
                        onClick={() => {
                            const quantity = parseInt((document.querySelector('.to-cart-number') as HTMLInputElement).value);
                            handleAddToCart(quantity); // Add the book with the specified quantity
                        }} 
                        variant="filled" 
                        color="red" 
                    />
                </div>
                {notification && <div className="notification">{notification}</div>} {/* Render notification */}
            </div>
        </div>
    );
};

// Exporting the component
export default BookDetails;
