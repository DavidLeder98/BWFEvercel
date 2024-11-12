import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteAuthor, getAuthorById } from '../../../services/author/AuthorService';
import '../AdminPanel.css';

const AdminAuthorDelete: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the author ID from the route params
    const [authorName, setAuthorName] = useState(''); // State for author name
    const [authorDescription, setAuthorDescription] = useState(''); // State for author description
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation message
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    const navigate = useNavigate(); // For navigation after deletion

    // Load author data when the component mounts
    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                const author = await getAuthorById(parseInt(id!)); // Fetch the author data
                setAuthorName(author.name); // Set the name in state
                setAuthorDescription(author.description); // Set the description in state
            } catch (err) {
                setError('Failed to load author data.'); // Handle fetch error
                console.error('Error fetching author data:', err);
            }
        };

        fetchAuthorData(); // Call the fetch function
    }, [id]);

    const handleConfirmDelete = async () => {
        try {
            await deleteAuthor(parseInt(id!)); // Call the service function to delete the author
            setSuccessMessage('Author deleted successfully!'); // Set success message

            // Navigate back to the authors list after a delay
            setTimeout(() => {
                navigate('/admin/author');
            }, 1000);
        } catch (err) {
            setError('Failed to delete author. Please try again.');
            console.error('Error deleting author:', err);
        } finally {
            setShowConfirmation(false); // Hide confirmation after processing
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false); // Hide confirmation
    };

    return (
        <div className="admin-panel-container">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
                <Link to="/admin/author"><h3>Authors / </h3></Link>
                <h3>Delete Author</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Delete Author</h1>
                </div>

                <form className="ap-form col">
                    <div className="ap-form-group col">
                        <label htmlFor="authorName">Author Name:</label>
                        <input
                            type="text"
                            id="authorName"
                            value={authorName}
                            disabled // Disable the input field
                            className="ap-input-name"
                        />
                    </div>
                    <div className="ap-form-group col">
                        <label htmlFor="authorDescription">Author Description:</label>
                        <textarea
                            id="authorDescription"
                            value={authorDescription}
                            disabled // Disable the textarea
                            className="ap-input-textarea"
                        />
                    </div>
                    {error && <p className="ap-error">{error}</p>}
                    <div className="ap-btn-back-container row">
                        <Link to="/admin/author">
                            <div className="ap-btn-back">
                                <p>Back</p>
                            </div>
                        </Link>
                        <button type="button" onClick={() => setShowConfirmation(true)} className="ap-btn-delete">Delete Author</button>
                    </div>
                </form>

                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to delete this author?</span>
                            <div className="confirmation-buttons">
                                <button onClick={handleConfirmDelete} className="ap-btn-delete">Yes</button>
                                <button onClick={handleCancel} className="ap-btn-back">No</button>
                            </div>
                        </div>
                    </div>
                )}

                {successMessage && (
                    <div className="success-message">
                        <span>{successMessage}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAuthorDelete;