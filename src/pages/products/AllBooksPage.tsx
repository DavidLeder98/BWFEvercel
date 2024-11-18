import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import BookList from "../../components/booklist/BookList";

const AllBooksPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchParams] = useSearchParams();
    const searchTag = searchParams.get('search') || ''; // Gets the search term from the URL

    useEffect(() => {
    }, [searchTag]);

    return (
        <BookList initialSearchTag={searchTag} />
    );
};

export default AllBooksPage;