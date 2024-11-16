import './Authors.css';
import { useEffect, useState } from 'react';
import { getAuthors } from '../../services/author/AuthorService';
import { AuthorListDto } from '../../services/author/AuthorListDto';
import { Link } from 'react-router-dom';
import PageEnd from '../pageend/PageEnd';

const Authors: React.FC = () => {
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
            } catch (error) {
                setError('Error fetching authors.');
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    if (loading) {
        return <div>Loading authors...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Filter authors based on the search term
    const filteredAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="all-authors-container">
            <div className="aa-top">
                <h1 className="aa-h1">All Authors</h1>
                <input 
                    className="aa-search-bar"
                    type="text" 
                    placeholder="Quick-search authors..."
                    value={searchTerm} // Controlled input
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                />
            </div>
            <ul className="aa-ul">
                {filteredAuthors.map((author) => (
                    <Link to={`/author/${author.id}`} key={author.id}>
                        <div className="aa-li-container">
                            <li className="aa-li">{author.name}</li>
                        </div>
                    </Link>
                ))}
            </ul>
            <PageEnd />
        </div>
    );
};

export default Authors;