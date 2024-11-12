import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBundleWithBookList, updateBundle } from '../../../services/bundle/BundleService';
import { getBookList } from '../../../services/book/BookService'; // Import getBookList
import { BundleWithBookListDto } from '../../../services/bundle/BundleWithBookListDto';
import { BookListDto } from '../../../services/book/BookListDto'; // Import BookListDto
import Select from 'react-select';
import '../AdminPanel.css';

const AdminBundleEdit = () => {
    const { id } = useParams<{ id: string }>();
    const [bundle, setBundle] = useState<BundleWithBookListDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [bundleName, setBundleName] = useState<string>(''); 
    const [availableBooks, setAvailableBooks] = useState<BookListDto[]>([]); // Available books for selection
    const [selectedBooks, setSelectedBooks] = useState<{ label: string; value: number }[]>([]); // Selected books in the dropdown
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBundleWithBooks = async () => {
            try {
                if (id) {
                    const bundleData = await getBundleWithBookList(parseInt(id));
                    setBundle(bundleData);
                    setBundleName(bundleData.name);
                    setSelectedBooks(
                        bundleData.books.map((book) => ({
                            label: book.title,
                            value: book.id
                        }))
                    );
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load bundle details');
                setLoading(false);
            }
        };

        fetchBundleWithBooks();
    }, [id]);

    useEffect(() => {
        const fetchAvailableBooks = async () => {
            try {
                const books = await getBookList();
                setAvailableBooks(books);
            } catch (err) {
                setError('Failed to load available books');
            }
        };

        fetchAvailableBooks();
    }, []);

    const handleSaveChanges = async () => {
        if (!bundle) return;

        const updatedBundle = {
            id: bundle.id,
            name: bundleName,
            bookIds: selectedBooks.map((book) => book.value),
        };

        try {
            await updateBundle(updatedBundle);
            setSuccessMessage('Bundle updated successfully!');
            setTimeout(() => {
                navigate('/admin/bundle');
            }, 2000);
        } catch (error) {
            setError('Failed to update the bundle.');
        }
    };

    const handleConfirm = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const handleBookSelection = (selectedOptions: any) => {
        setSelectedBooks(selectedOptions || []);
    };

    return (
        <div className="admin-panel-container">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
                <Link to="/admin/bundle"><h3>Bundles / </h3></Link>
                <h3>Edit Bundle</h3>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Edit Bundle</h1>
                </div>
                {loading ? (
                    <p>Loading bundle details...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : bundle ? (
                    <div className="ap-form col">
                        <div className="ap-form-group col">
                            <label htmlFor="bundleName">Bundle Name:</label>
                            <input
                                type="text"
                                id="bundleName"
                                value={bundleName}
                                onChange={(e) => setBundleName(e.target.value)}
                                className="ap-input-name"
                            />
                        </div>
                        <div className="ap-form-group col">
                            <label htmlFor="bookIds">Add Books: </label>
                            <Select
                                isMulti
                                name="bookIds"
                                options={availableBooks.map((book) => ({
                                    label: `${book.title} by ${book.authorName}`,
                                    value: book.id
                                }))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={selectedBooks}
                                onChange={handleBookSelection}
                            />
                        </div>
                        <table className="ap-table">
                            <thead>
                                <tr className="ap-thr">
                                    <th className="apt-col-num">#</th>
                                    <th className="apt-col-id">Id</th>
                                    <th className="apt-col-name">Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bundle.books.map((book, index) => (
                                    <tr key={book.id} className="ap-tr">
                                        <td className="apt-col-num">{index + 1}.</td>
                                        <td className="apt-col-id">{book.id}</td>
                                        <td className="apt-col-name">{book.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No bundle found.</p>
                )}
                <div className="ap-btn-back-container row">
                    <Link to="/admin/bundle">
                        <div className="ap-btn-back">
                            <p>Back</p>
                        </div>
                    </Link>
                    <button type="button" onClick={handleConfirm} className="ap-btn-edit">
                        Save Changes
                    </button>
                </div>

                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-container col">
                            <span className="confirmation-message">Are you sure you want to update this bundle?</span>
                            <div className="confirmation-buttons">
                                <button onClick={handleSaveChanges} className="ap-btn-edit">Yes</button>
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

export default AdminBundleEdit;
