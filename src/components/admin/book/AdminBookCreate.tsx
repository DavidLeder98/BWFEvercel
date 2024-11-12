import React, { useState, useEffect } from 'react';
import { createBook } from '../../../services/book/BookService';
import { BookCreateDto } from '../../../services/book/BookCreateDto';
import { getAllCategories } from '../../../services/category/CategoryService';
import { CategoryListDto } from '../../../services/category/CategoryListDto';
import { getAuthors } from '../../../services/author/AuthorService';
import { AuthorListDto } from '../../../services/author/AuthorListDto';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../AdminPanel.css';
import { Link } from 'react-router-dom';

const AdminBookCreate: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [bookData, setBookData] = useState<BookCreateDto>({
        Title: '',
        Description: '',
        Rating: 1,
        BestSeller: false,
        ListPrice: 0,
        Price: 0,
        AuthorId: 0,
        CategoryIds: [],
        ImageFile: null,
        LargeImageFile: null,
    });

    const [categories, setCategories] = useState<CategoryListDto[]>([]);
    const [authors, setAuthors] = useState<AuthorListDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategoriesAndAuthors = async () => {
            try {
                const categoriesData = await getAllCategories();
                setCategories(categoriesData);
                const authorsData = await getAuthors();
                setAuthors(authorsData);
            } catch (error) {
                setError('Failed to load categories or authors');
            }
        };
        fetchCategoriesAndAuthors();
    }, []);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const authorOptions = authors.map((author) => ({
        value: author.id,
        label: author.name,
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBookData((prev) => ({
            ...prev,
            [name]: name === 'CategoryIds' ? value.split(',').map(Number) : value,
        }));
    };

    const handleCategoryChange = (selectedOptions: any) => {
        const selectedCategoryIds = selectedOptions.map((option: { value: number }) => option.value);
        setBookData((prev) => ({
            ...prev,
            CategoryIds: selectedCategoryIds,
        }));
    };

    const handleAuthorChange = (selectedOption: any) => {
        setBookData((prev) => ({
            ...prev,
            AuthorId: selectedOption?.value || 0,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setBookData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (bookData.Title.trim() === '') {
            setError('Book title is required');
            return;
        }

        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        try {
            await createBook(bookData);
            setSuccessMessage('Book created successfully!');
            setTimeout(() => {
                navigate('/admin/book'); // Redirect to the book list page
            }, 1000);
        } catch (error) {
            setError('Failed to create book. Please try again.');
            console.error('Error creating book:', error);
        } finally {
            setShowConfirmation(false);
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
                <h3>Create new Book</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Create new Book</h1>
                </div>

                <form onSubmit={handleSubmit} className="ap-form col">
                    <div className="ap-form-group col">
                        <label htmlFor="Title">Book Title:</label>
                        <input
                            type="text"
                            name="Title"
                            value={bookData.Title}
                            onChange={handleChange}
                            placeholder="Enter book title"
                            required
                            className="ap-input-name"
                        />
                    </div>

                    <div className="ap-form-group col">
                        <label htmlFor="Description">Description:</label>
                        <textarea
                            name="Description"
                            value={bookData.Description}
                            onChange={handleChange}
                            placeholder="Enter book description"
                            required
                            className="ap-input-textarea"
                        />
                    </div>

                    <div className="ap-form-group col">
                        <label htmlFor="Rating">Rating:</label>
                        <input
                            type="number"
                            name="Rating"
                            value={bookData.Rating}
                            onChange={handleChange}
                            min="1"
                            max="5"
                            step="0.1"
                            required
                            className="ap-input-num"
                        />
                    </div>

                    <div className="ap-form-group best-seller-check">
                        <label htmlFor="BestSeller">Best Seller: </label>
                        <input
                            type="checkbox"
                            name="BestSeller"
                            checked={bookData.BestSeller}
                            onChange={(e) => setBookData({ ...bookData, BestSeller: e.target.checked })}
                            className="best-seller-box"
                        />
                    </div>

                    <div className="ap-form-group col">
                        <label htmlFor="ListPrice">List Price:</label>
                        <input
                            type="number"
                            name="ListPrice"
                            value={bookData.ListPrice}
                            onChange={handleChange}
                            min="0"
                            max="1000"
                            step="0.01"
                            required
                            className="ap-input-num"
                        />
                    </div>

                    <div className="ap-form-group col">
                        <label htmlFor="Price">Price:</label>
                        <input
                            type="number"
                            name="Price"
                            value={bookData.Price}
                            onChange={handleChange}
                            min="0"
                            max="1000"
                            step="0.01"
                            required
                            className="ap-input-num"
                        />
                    </div>

                    <div className="ap-form-group top-m10 col">
                        <label htmlFor="ImageFile">Image File:</label>
                        <input
                            className="upload-btn"
                            type="file"
                            name="ImageFile"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="ap-form-group top-m10 col">
                        <label htmlFor="LargeImageFile">Large Image File:</label>
                        <input
                            className="upload-btn"
                            type="file"
                            name="LargeImageFile"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="ap-form-group top-m10 col">
                        <label htmlFor="AuthorId">Author:</label>
                        <Select
                            name="AuthorId"
                            options={authorOptions}
                            className="basic-single-select"
                            classNamePrefix="select"
                            onChange={handleAuthorChange}
                        />
                    </div>

                    <div className="ap-form-group top-m10 col">
                        <label htmlFor="CategoryIds">Categories:</label>
                        <Select
                            isMulti
                            name="CategoryIds"
                            options={categoryOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleCategoryChange}
                        />
                    </div>

                    {error && <p className="ap-error">{error}</p>}

                    <div className="ap-btn-back-container row">
                        <Link to="/admin/book">
                            <div className="ap-btn-back">
                                <p>Back</p>
                            </div>
                        </Link>
                        <button type="submit" className="ap-btn-create">Create Book</button>
                    </div>
                </form>

                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to create this book?</span>
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

export default AdminBookCreate;