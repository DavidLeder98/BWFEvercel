import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookList } from '../../services/book/BookService';
import { BookListDto } from '../../services/book/BookListDto';
import search from '../../assets/icons/search.png';
import './QuickSearchBar.css';
import { Link } from 'react-router-dom';

const QuickSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<BookListDto[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.length > 0) {
            try {
                const results = await getBookList(term);
                setSearchResults(results);
                setShowDropdown(true);
            } catch (error) {
                console.error('Error searching for books:', error);
            }
        } else {
            setShowDropdown(false);
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = () => {
        if (searchTerm.trim()) {
            navigate(`/allbooks?search=${encodeURIComponent(searchTerm)}`, { replace: false });
            setSearchTerm('');
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.relatedTarget as Node)) {
            setShowDropdown(false);
        }
    };

    return (
        <div
            className="search-container-adjuster"
            onBlur={handleBlur}
            onFocus={() => setShowDropdown(true)}
            ref={searchBarRef}
            tabIndex={-1}
        >
            <div className="search-container row">
                <input
                    type="text"
                    placeholder="Search for products and authors..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit(); }}
                />
                <div className="search-icon-container">
                    {isSmallScreen && searchTerm ? (
                        <button className="search-icon-container" onClick={handleClearSearch}>
                            <span className="search-clear">X</span>
                        </button>
                    ) : (
                        <button className="search-icon-container" onClick={handleSearchSubmit}>
                            <img src={search} alt="search icon" className="search-icon" />
                        </button>
                    )}
                </div>
            </div>
            {showDropdown && searchResults.length > 0 && (
                <div className="search-dropdown">
                    {searchResults.map(book => (
                        <Link to={`/book/${book.id}`} key={book.id} className="search-result-item">
                            {book.title} by {book.authorName}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuickSearchBar;