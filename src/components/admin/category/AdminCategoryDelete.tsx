import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, deleteCategory } from '../../../services/category/CategoryService';
import '../AdminPanel.css';

const AdminCategoryDelete = () => {
    const { id } = useParams<{ id: string }>(); // Get the category ID from the URL parameters
    const navigate = useNavigate(); // For navigating after deletion
    const [categoryName, setCategoryName] = useState(''); // State to hold the category name
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

    const handleDelete = async () => {
        try {
            await deleteCategory(Number(id)); // Call the service function to delete the category
            setSuccessMessage("Category deleted successfully!"); // Set the success message
            
            // Navigate back to the categories list after a delay
            setTimeout(() => {
                navigate('/admin/category'); // Navigate after success
            }, 1000);
        } catch (err) {
            setError('Failed to delete category. Please try again.');
            console.error('Error deleting category:', err);
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
                <h3>Delete Category</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Delete Category</h1>
                </div>
                <div className="ap-form col">
                    <div className="ap-form-group col">
                        <label htmlFor="categoryName">Category Name:</label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            disabled // Make the input field disabled
                            className="ap-input-name"
                        />
                        {error && <p className="ap-error">{error}</p>}
                    </div>
                    
                    <div className="ap-btn-back-container row">
                        <Link to="/admin/category">
                            <div className="ap-btn-back">
                                <p>Back</p>
                            </div>
                        </Link>
                        <button onClick={() => setShowConfirmation(true)} className="ap-btn-delete">Delete Category</button>
                    </div>
                </div>
                
                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to delete this category?</span>
                            <div className="confirmation-buttons">
                                <button onClick={handleDelete} className="ap-btn-delete">Yes</button>
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

export default AdminCategoryDelete;