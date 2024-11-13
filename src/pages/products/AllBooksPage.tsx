import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import BookList from "../../components/booklist/BookList";

const AllBooksPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchParams] = useSearchParams();
    const searchTag = searchParams.get('search') || ''; // Get the search term from the URL

    useEffect(() => {
        // Handle search term updates here when URL changes
    }, [searchTag]); // Re-run this effect when the search tag in the URL changes

    return (
        <BookList initialSearchTag={searchTag} /> // Pass the search term as a prop
    );
};

export default AllBooksPage;