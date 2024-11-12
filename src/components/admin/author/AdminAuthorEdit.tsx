import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateAuthor } from '../../../services/author/AuthorService';
import { AuthorEditDto } from '../../../services/author/AuthorEditDto';
import { getAuthorById } from '../../../services/author/AuthorService'; // Import the function to get author by ID
import '../AdminPanel.css';

const AdminAuthorEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the author ID from the route params
    const [authorName, setAuthorName] = useState(''); // State for author name input
    const [authorDescription, setAuthorDescription] = useState(''); // State for author description input
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation message
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    const navigate = useNavigate(); // For navigation after editing

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        setError(null); // Clear previous errors

        // Validate inputs
        if (authorName.trim() === '') {
            setError('Author name is required');
            return;
        }

        if (authorName.length > 100) {
            setError('Author name must be no longer than 100 characters');
            return;
        }

        if (authorDescription.trim() === '') {
            setError('Author description is required');
            return;
        }

        if (authorDescription.length > 1000) {
            setError('Author description must be no longer than 1000 characters');
            return;
        }

        setShowConfirmation(true); // Show confirmation message
    };

    const handleConfirm = async () => {
        const updatedAuthor: AuthorEditDto = {
            id: parseInt(id!), // Convert id from string to number
            name: authorName,
            description: authorDescription,
        };

        try {
            await updateAuthor(updatedAuthor.id, updatedAuthor); // Call the service function to update the author
            setSuccessMessage('Author updated successfully!'); // Set success message

            // Navigate back to the authors list after a delay
            setTimeout(() => {
                navigate('/admin/author');
            }, 1000);
        } catch (err) {
            setError('Failed to update author. Please try again.');
            console.error('Error updating author:', err);
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
                <h3>Edit Author</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Edit Author</h1>
                </div>

                <form onSubmit={handleSubmit} className="ap-form col">
                    <div className="ap-form-group col">
                        <label htmlFor="authorName">Author Name:</label>
                        <input
                            type="text"
                            id="authorName"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="ap-input-name"
                            placeholder="Enter author name"
                        />
                    </div>
                    <div className="ap-form-group col">
                        <label htmlFor="authorDescription">Author Description:</label>
                        <textarea
                            id="authorDescription"
                            value={authorDescription}
                            onChange={(e) => setAuthorDescription(e.target.value)}
                            className="ap-input-textarea"
                            placeholder="Enter author description"
                        />
                    </div>
                    {error && <p className="ap-error">{error}</p>}
                    <div className="ap-btn-back-container row">
                        <Link to="/admin/author">
                            <div className="ap-btn-back">
                                <p>Back</p>
                            </div>
                        </Link>
                        <button type="submit" className="ap-btn-create">Update Author</button>
                    </div>
                </form>

                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to update this author?</span>
                            <div className="confirmation-buttons">
                                <button onClick={handleConfirm} className="ap-btn-create">Yes</button>
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

export default AdminAuthorEdit;