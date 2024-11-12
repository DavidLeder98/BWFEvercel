import { useEffect, useState } from 'react';
import { SortBy } from '../../../services/book/SortBy';
import { getBooks} from '../../../services/book/BookService';
import { BookCardDto } from '../../../services/book/BookCardDto';
import '../AdminPanel.css';
import { Link } from 'react-router-dom';

const AdminBook = () => {
    const [books, setBooks] = useState<BookCardDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Id); // State for sort option

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksList = await getBooks(searchTerm, sortBy);
                setBooks(booksList);
                setLoading(false);
            } catch (err) {
                setError('Failed to load books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, [searchTerm, sortBy]); // Re-fetch books when search term or sort option changes

    // Filter books based on the search term
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-panel-container">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
                <Link to="/admin/book"><h3>Books / </h3></Link>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Manage Books</h1>
                    <input
                        className="ap-search-bar"
                        type="text"
                        placeholder="Quick-search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(Number(e.target.value) as SortBy)} // Update sort option
                        className="ap-select"
                    >
                        <option value={SortBy.Id}>Sort by ID</option>
                        <option value={SortBy.Title}>Sort by Title</option>
                        <option value={SortBy.Rating}>Sort by Rating</option>
                        <option value={SortBy.PriceAscending}>Sort by Price (Low to High)</option>
                        <option value={SortBy.PriceDescending}>Sort by Price (High to Low)</option>
                    </select>
                    <p className="ap-create-new">
                        <Link to="/admin/book/create">+ Create new Book</Link>
                    </p>
                </div>
                {loading ? (
                    <p>Loading books...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className="ap-table">
                        <thead>
                            <tr className="ap-thr">
                                <th className="apt-col-num">#</th>
                                <th className="apt-col-id">Id</th>
                                <th className="apt-col-name">Title</th>
                                <th className="apt-col-name">Author</th>
                                <th className="apt-col-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book, index) => (
                                <tr key={book.id} className="ap-tr">
                                    <td className="apt-col-num">{index + 1}.</td>
                                    <td className="apt-col-id">{book.id}</td>
                                    <td className="apt-col-name">
                                        <Link to={`/book/${book.id}`}>
                                            {book.title}
                                        </Link>
                                    </td>
                                    <td className="apt-col-name">{book.authorName}</td>
                                    <td className="apt-col-action row">
                                        <Link to={`/admin/book/edit/${book.id}`}>
                                            <div className="ap-btn-list-edit">
                                                <p>Edit</p>
                                            </div>
                                        </Link>
                                        <Link to={`/admin/book/delete/${book.id}`}>
                                            <div className="ap-btn-list-delete">
                                                <p>Delete</p>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="ap-btn-back-container row">
                    <Link to="/admin">
                        <div className="ap-btn-back">
                            <p>Back</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminBook;