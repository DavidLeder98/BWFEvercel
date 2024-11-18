import { useParams } from "react-router-dom";
import AuthorWithBooks from "../../components/authorwithbooks/AuthorWithBooks";
import { useEffect } from 'react';
import BtnHome from "../../components/pageend/BtnHome";

const AuthorPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams<{ id: string }>();

    const authorId = id ? parseInt(id) : null;

    if (!authorId) {
        return <p>Invalid author ID</p>;
    }

    return (
        <>
            <AuthorWithBooks authorId={authorId} />
            <BtnHome />
        </>
    );
};

export default AuthorPage;