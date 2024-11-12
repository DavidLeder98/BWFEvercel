import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAuthor } from '../../../services/author/AuthorService';
import { AuthorCreateDto } from '../../../services/author/AuthorCreateDto';
import '../AdminPanel.css';

const AdminAuthorCreate: React.FC = () => {
    const [authorName, setAuthorName] = useState(''); // State to hold the author name input
    const [authorDescription, setAuthorDescription] = useState(''); // State to hold the author description input
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation message
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    const navigate = useNavigate(); // For navigating after form submission

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        setError(null); // Clear previous errors

        // Validate the inputs
        if (authorName.trim() === '') {
            setError('Author name is required');
            return;
        }

        if (authorName.length > 100) {
            setError('Author name must be no longer than 50 characters');
            return;
        }

        if (authorDescription.trim() === '') {
            setError('Author description is required');
            return;
        }

        if (authorDescription.length > 1000) {
            setError('Author description must be no longer than 50 characters');
            return;
        }

        setShowConfirmation(true); // Show confirmation message
    };

    const handleConfirm = async () => {
        const newAuthor: AuthorCreateDto = {
            name: authorName,
            description: authorDescription
        };

        try {
            await createAuthor(newAuthor); // Call the service function to create the author
            setSuccessMessage('Author created successfully!'); // Set the success message
            
            // Navigate back to the authors list after a delay
            setTimeout(() => {
                navigate('/admin/author'); // Navigate after success
            }, 1000);
        } catch (err) {
            setError('Failed to create author. Please try again.');
            console.error('Error creating author:', err);
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
                <h3>Create new Author</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Create new Author</h1>
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
                        <button type="submit" className="ap-btn-create">Create Author</button>
                    </div>
                </form>

                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to create this author?</span>
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

export default AdminAuthorCreate;