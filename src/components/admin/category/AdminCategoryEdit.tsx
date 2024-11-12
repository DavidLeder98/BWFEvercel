import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../../../services/category/CategoryService';
import { CategoryEditDto } from '../../../services/category/CategoryEditDto';
import '../AdminPanel.css';

const AdminCategoryEdit = () => {
    const { id } = useParams<{ id: string }>(); // Get the category ID from the URL parameters
    const navigate = useNavigate(); // For navigating after form submission
    const [categoryName, setCategoryName] = useState(''); // State to hold the category name input
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation message
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

    // Fetch the existing category details when the component mounts
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const category = await getCategoryById(Number(id));
                setCategoryName(category.name); // Set the category name in state
            } catch (err) {
                console.error(err);
                setError('Failed to fetch category data.');
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = (event: React.FormEvent) => {
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
        const categoryEditDto: CategoryEditDto = {
            id: Number(id),
            name: categoryName,
        };

        try {
            await updateCategory(Number(id), categoryEditDto); // Call the service function to update the category
            setSuccessMessage("Category updated successfully!"); // Set the success message
            
            // Navigate back to the categories list after a delay
            setTimeout(() => {
                navigate('/admin/category'); // Navigate after success
            }, 1000);
        } catch (err) {
            setError('Failed to update category. Please try again.');
            console.error('Error updating category:', err);
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
                <h3>Edit Category</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Edit Category</h1>
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
                        <button type="submit" className="ap-btn-edit">Update Category</button>
                    </div>
                </form>
                
                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to update this category?</span>
                            <div className="confirmation-buttons">
                                <button onClick={handleConfirm} className="ap-btn-edit">Yes</button>
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

export default AdminCategoryEdit;