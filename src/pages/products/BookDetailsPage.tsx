import { useParams } from "react-router-dom";
import BookDetails from "../../components/bookdetails/BookDetails";
import { Navigate } from "react-router-dom";
import Bundle from "../../components/bundle/Bundle";
import { useEffect } from 'react';
import PageEnd from "../../components/pageend/PageEnd";

const BookDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const bookId = id ? parseInt(id, 10) : undefined;

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to top whenever id changes
    }, [id]); // Triggers every time the book ID changes

    if (bookId === undefined) {
        return <Navigate to="/404" />; // Redirects to a 404 page if no valid ID is provided
    }

    return (
        <div>
            <BookDetails bookId={bookId} />
            <Bundle id={1} />
            <Bundle id={2} />
            <PageEnd />
        </div>
    );
};

export default BookDetailsPage;