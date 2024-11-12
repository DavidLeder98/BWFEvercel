import { useEffect, useState } from 'react';
import { getAuthors } from '../../../services/author/AuthorService';
import { AuthorListDto } from '../../../services/author/AuthorListDto';
import '../AdminPanel.css';
import { Link } from 'react-router-dom';

const AdminAuthor = () => {
    const [authors, setAuthors] = useState<AuthorListDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authorsList = await getAuthors();
                setAuthors(authorsList);
                setLoading(false);
            } catch (err) {
                setError('Failed to load authors');
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    // Filter authors based on the search term
    const filteredAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-panel-container">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
                <Link to="/admin/author"><h3>Authors / </h3></Link>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Manage Authors</h1>
                    <input
                        className="ap-search-bar"
                        type="text"
                        placeholder="Quick-search authors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                    <p className="ap-create-new">
                        <Link to="/admin/author/create">+ Create new Author</Link>
                    </p>
                </div>
                {loading ? (
                    <p>Loading authors...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className="ap-table">
                        <thead>
                            <tr className="ap-thr">
                                <th className="apt-col-num">#</th>
                                <th className="apt-col-id">Id</th>
                                <th className="apt-col-name">Name</th>
                                <th className="apt-col-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAuthors.map((author, index) => (
                                <tr key={author.id} className="ap-tr">
                                    <td className="apt-col-num">{index + 1}.</td>
                                    <td className="apt-col-id">{author.id}</td>
                                    <td className="apt-col-name">{author.name}</td>
                                    <td className="apt-col-action row">
                                        <Link to={`/admin/author/edit/${author.id}`}>
                                            <div className="ap-btn-list-edit">
                                                <p>Edit</p>
                                            </div>
                                        </Link>
                                        <Link to={`/admin/author/delete/${author.id}`}>
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

export default AdminAuthor;