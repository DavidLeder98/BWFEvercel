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
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    // Filters authors based on the search term
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
                    onChange={(e) => setSearchTerm(e.target.value)} // Updates search term
                />
            </div>
            <ul className="aa-ul">
                {filteredAuthors.map((author) => (
                        <div className="aa-li-container">
                            <Link to={`/author/${author.id}`} key={author.id}>
                                <li className="aa-li">{author.name}</li>
                            </Link>
                        </div>
                ))}
            </ul>
            <PageEnd />
        </div>
    );
};

export default Authors;