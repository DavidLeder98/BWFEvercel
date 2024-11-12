import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById } from '../../../services/book/BookService';
import { deleteBook } from '../../../services/book/BookService'; // Make sure the deleteBook function is imported
import { BookDetailsDto } from '../../../services/book/BookDetailsDto';
import '../AdminPanel.css';
import { Link } from 'react-router-dom';

const AdminBookDelete: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { id } = useParams<{ id: string }>(); // Get book ID from URL

    const [bookData, setBookData] = useState<BookDetailsDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const book = await getBookById(Number(id)); // Fetch the book details by ID
                setBookData(book);
            } catch (error) {
                setError('Failed to load book details.');
            }
        };
        fetchBookData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteBook(Number(id)); // Call the delete function
            setSuccessMessage('Book deleted successfully!');
            setTimeout(() => {
                navigate('/admin/book'); // Redirect to the book list page
            }, 1000);
        } catch (error) {
            setError('Failed to delete book. Please try again.');
            console.error('Error deleting book:', error);
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="admin-panel-container">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
                <Link to="/admin/book"><h3>Books / </h3></Link>
                <h3>Delete Book</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Delete Book</h1>
                </div>

                {error && <p className="error-message">{error}</p>}
                {successMessage && (
                        <div className="success-message">
                            <span>{successMessage}</span>
                        </div>
                )}

                {bookData && (
                    <div className="book-details">
                        <ul className="book-delete-props">
                            <li><strong>Id:</strong> {bookData.id}</li>
                            <li><strong>Title:</strong> {bookData.title}</li>
                            <li><strong>Description:</strong> {bookData.description}</li>
                            <li><strong>Rating:</strong> {bookData.rating}</li>
                            <li><strong>Best Seller:</strong> {bookData.bestSeller ? 'Yes' : 'No'}</li>
                            <li><strong>List Price:</strong> ${bookData.listPrice.toFixed(2)}</li>
                            <li><strong>Price:</strong> ${bookData.price.toFixed(2)}</li>
                            <li><strong>Author:</strong> {bookData.authorName}</li>
                            <li>
                                <strong>Categories:</strong> {bookData.categories.map(category => category.name).join(', ')}
                            </li>
                        </ul>

                        <div className="ap-btn-back-container row">
                            <Link to="/admin/book">
                                <div className="ap-btn-back">
                                    <p>Back</p>
                                </div>
                            </Link>
                            <button onClick={() => setShowConfirmation(true)} className="ap-btn-delete">Delete Book</button>
                        </div>
                    </div>
                )}

                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to delete this book?</span>
                            <div className="confirmation-buttons">
                                <button onClick={handleDelete} className="ap-btn-delete">Yes</button>
                                <button onClick={handleCancel} className="ap-btn-back">No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBookDelete;