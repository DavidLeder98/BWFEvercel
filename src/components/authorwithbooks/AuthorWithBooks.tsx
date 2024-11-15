import './AuthorWithBooks.css';
import { BookCardDto } from "../../services/book/BookCardDto";
import { useEffect, useState } from 'react';
import { getAuthorById } from '../../services/author/AuthorService';
import { SortBy } from "../../services/book/SortBy";
import { AuthorWithBooksDto } from '../../services/author/AuthorWithBooksDto';
import Card from '../card/Card';

interface AuthorWithBooksProps {
    authorId: number;
}

const showNotification = () => {
    alert('Book added to cart!');
  };

const AuthorWithBooks: React.FC<AuthorWithBooksProps> = ({ authorId }) => {
    const [books, setBooks] = useState<BookCardDto[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Title);
    const [error, setError] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string>('');
    const [authorDescription, setAuthorDescription] = useState<string>('');

    // Function to fetch author by id and set books
    const fetchAuthor = async () => {
        try {
            const author: AuthorWithBooksDto = await getAuthorById(authorId, sortBy);
            setBooks(author.books);
            setAuthorName(author.name);
            setAuthorDescription(author.description)
        } catch (error) {
            setError('Failed to load books for the selected author.');
            console.error('Error fetching author:', error);
        }
    };

    useEffect(() => {
        fetchAuthor();
    }, [sortBy, authorId]); // Refetch whenever sortBy or authorId changes

    return (
        <div className="awb-positioner">
            <div className="awb-container col">
                <div className="awb-details">
                        <h1>{authorName}</h1>
                        <div className="awb-dc">
                            <h3>About the author:</h3>
                            <p className="awb-desc">{authorDescription}</p>
                        </div>
                    </div>
                <div className="awb-top">
                    <div className="awb-bbya"><h3 className="awb-by">Books By: </h3><h2 className="awb-name">{authorName}</h2></div>
                    <select
                        className="awb-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(Number(e.target.value))}
                    >
                        <option value={SortBy.Title}>Sort by Title</option>
                        <option value={SortBy.PriceAscending}>Price: Low to High</option>
                        <option value={SortBy.PriceDescending}>Price: High to Low</option>
                        <option value={SortBy.Rating}>Rating</option>
                        <option value={SortBy.Id}>Product (ID)</option>
                    </select>
                </div>
                {error && <p>{error}</p>}
                <div className="awb-list">
                    {books.map(book => (
                        <Card key={book.id} book={book} showNotification={showNotification} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthorWithBooks;