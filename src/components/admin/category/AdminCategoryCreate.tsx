import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCategory } from '../../../services/category/CategoryService';
import { CategoryCreateDto } from '../../../services/category/CategoryCreateDto';
import '../AdminPanel.css';

const AdminCategoryCreate = () => {
    const [categoryName, setCategoryName] = useState(''); // State to hold the category name input
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation message
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    const navigate = useNavigate(); // For navigating after form submission

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        setError(null); // Clear previous errors

        if (categoryName.trim() === '') {
            setError('Category name is required');
            return;
        }

        if (categoryName.length > 20) {
            setError('Category name must be no longer than 30 characters');
            return;
        }

        setShowConfirmation(true); // Show confirmation message
    };

    const handleConfirm = async () => {
        const newCategory: CategoryCreateDto = {
            name: categoryName
        };

        try {
            await createCategory(newCategory); // Call the service function to create the category
            setSuccessMessage("Category created successfully!"); // Set the success message
            
            // Navigate back to the categories list after a delay
            setTimeout(() => {
                navigate('/admin/category'); // Navigate after success
            }, 1000);
        } catch (err) {
            setError('Failed to create category. Please try again.');
            console.error('Error creating category:', err);
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
                <Link to="/admin/category"><h3>Categories / </h3></Link>
                <h3>Create new Category</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Create new Category</h1>
                </div>
                <form onSubmit={handleSubmit} className="ap-form col">
                    <div className="ap-form-group col">
                        <label htmlFor="categoryName">Category Name:</label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="ap-input-name"
                            placeholder="Enter category name"
                        />
                        {error && <p className="ap-error">{error}</p>}
                    </div>
                    <div className="ap-btn-back-container row">
                        <Link to="/admin/category">
                            <div className="ap-btn-back">
                                <p>Back</p>
                            </div>
                        </Link>
                        <button type="submit" className="ap-btn-create">Create Category</button>
                    </div>
                </form>
                
                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to create this category?</span>
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
}

export default AdminCategoryCreate;