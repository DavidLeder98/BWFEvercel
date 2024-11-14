import { useParams } from "react-router-dom";
import BookDetails from "../../components/bookdetails/BookDetails";
import { Navigate } from "react-router-dom";
import Bundle from "../../components/bundle/Bundle";
import { useEffect } from 'react';

const BookDetailsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const { id } = useParams<{ id: string }>(); // Use the useParams hook to get the book ID
    const bookId = id ? parseInt(id, 10) : undefined; // Convert the ID to a number, or set it to null if undefined

    if (bookId === undefined) {
        return <Navigate to="/404" />; // Adjust the route as needed
    }

    return (
        <div>
            <BookDetails bookId={bookId} />
            <Bundle id={1} />
            <Bundle id={1} />
        </div>
    );
};

export default BookDetailsPage;