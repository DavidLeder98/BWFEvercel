import { useParams } from "react-router-dom";
import AuthorWithBooks from "../../components/authorwithbooks/AuthorWithBooks";
import { useEffect } from 'react';
import PageEnd from "../../components/pageend/PageEnd";

const AuthorPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams<{ id: string }>();

    // Safely parse the id and handle cases where id is undefined
    const authorId = id ? parseInt(id) : null;

    if (!authorId) {
        return <p>Invalid author ID</p>; // Handle the case where id is invalid or not present
    }

    return (
        <>
            <AuthorWithBooks authorId={authorId} />
            <PageEnd />
        </>
    );
};

export default AuthorPage;