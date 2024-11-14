import './BookList.css';
import { BookCardDto } from "../../services/book/BookCardDto";
import { useEffect, useState } from 'react';
import { getBooks } from "../../services/book/BookService";
import { SortBy } from "../../services/book/SortBy";
import Card from '../card/Card'; // Import the Card component
import Button from "../button/Button";
import BtnHome from '../pageend/BtnHome';

interface BookListProps {
    initialSearchTag?: string; // Accept initial search tag as a prop
}

const showNotification = () => {
    alert('Book added to cart!');
  };

const BookList = ({ initialSearchTag = '' }: BookListProps) => {
    const [books, setBooks] = useState<BookCardDto[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const [searchTags, setSearchTags] = useState<string[]>(initialSearchTag ? [initialSearchTag] : []); // State for search tags
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Title); // State for sort option
    const [error, setError] = useState<string | null>(null);

    // Update searchTags when initialSearchTag changes
    useEffect(() => {
        if (initialSearchTag && !searchTags.includes(initialSearchTag)) {
            setSearchTags([...searchTags, initialSearchTag]); // Add the new search tag
        }
    }, [initialSearchTag]); // Re-run this effect when the initialSearchTag prop changes

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const combinedSearchTerm = searchTags.join(' '); // Combine search tags into one string
                const fetchedBooks = await getBooks(combinedSearchTerm, sortBy);
                setBooks(fetchedBooks);
            } catch (err) {
                setError(`Failed to fetch books: ${err}`);
            }
        };

        fetchBooks();
    }, [searchTags, sortBy]); // Re-fetch books when search tags or sort option changes

    // Function to handle adding search term as a tag
    const addSearchTag = () => {
        if (searchTerm.trim() !== '' && !searchTags.includes(searchTerm)) {
            setSearchTags([...searchTags, searchTerm]);
            setSearchTerm(''); // Clear the search term after adding the tag
        }
    };

    // Function to remove a search tag
    const removeSearchTag = (tag: string) => {
        setSearchTags(searchTags.filter((t) => t !== tag));
    };

    return (
        <div className="bd-positioner">
            <div className="all-books-container col">
                <div className="ab-controlls">
                    <h1 className="ab-h1">All Books</h1>
                    <div className="ab-search-container row">
                        <input 
                            className="ab-search-bar"
                            type="text" 
                            placeholder="Search books..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            onKeyDown={(e) => { if (e.key === 'Enter') addSearchTag(); }} // Add search tag on Enter
                        />
                        <div>
                            <Button text="Search" onClick={addSearchTag} variant="outlined" color="blue" />
                        </div>
                    </div>
                    <select 
                        className="ab-select"
                        value={sortBy} 
                        onChange={(e) => setSortBy(Number(e.target.value))} // Convert string to number
                    >
                        <option value={SortBy.Title}>Sort by Title</option>
                        <option value={SortBy.PriceAscending}>Price: Low to High</option>
                        <option value={SortBy.PriceDescending}>Price: High to Low</option>
                        <option value={SortBy.Rating}>Rating</option>
                        <option value={SortBy.Id}>Product (ID)</option>
                    </select>
                </div>
                <div className="search-tags">
                    {searchTags.map((tag, index) => (
                        <div key={index} className="search-tag">
                            {tag} <button onClick={() => removeSearchTag(tag)}> X </button> {/* Remove tag button */}
                        </div>
                    ))}
                </div>
                {error && <p>{error}</p>}
                <div className="book-list">
                    {books.map(book => (
                        <Card key={book.id} book={book} showNotification={showNotification} />
                    ))}
                </div>
                <BtnHome />
            </div>
        </div>
    );
};

export default BookList;