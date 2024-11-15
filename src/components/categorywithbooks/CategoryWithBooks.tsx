import './CategoryWithBooks.css';
import { BookCardDto } from "../../services/book/BookCardDto";
import { useEffect, useState } from 'react';
import { getCategoryById } from '../../services/category/CategoryService';
import { SortBy } from "../../services/book/SortBy";
import { CategoryWithBooksDto } from '../../services/category/CategoryWithBooksDto';
import Card from '../card/Card';

interface CategoryWithBooksProps {
    categoryId: number;
}

const showNotification = () => {
    alert('Book added to cart!');
  };

const CategoryWithBooks: React.FC<CategoryWithBooksProps> = ({ categoryId }) => {
    const [books, setBooks] = useState<BookCardDto[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Title);
    const [error, setError] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState<string>('');

    // Function to fetch category by id and set books
    const fetchCategory = async () => {
        try {
            const category: CategoryWithBooksDto = await getCategoryById(categoryId, sortBy);
            setBooks(category.books);
            setCategoryName(category.name);
        } catch (error) {
            setError('Failed to load books for the selected category.');
            console.error('Error fetching category:', error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [sortBy, categoryId]); // Refetch whenever sortBy or categoryId changes

    return (
        <div className="cwb-positioner">
            <div className="cwb-container col">
                <div className="cwb-top">
                    <h2 className="cwb-h2">{categoryName}</h2>
                    <select
                        className="cwb-select"
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
                <div className="cwb-list">
                    {books.map(book => (
                        <Card key={book.id} book={book} showNotification={showNotification} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryWithBooks;