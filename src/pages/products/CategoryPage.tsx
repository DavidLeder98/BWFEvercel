import { useParams } from "react-router-dom";
import CategoryWithBooks from "../../components/categorywithbooks/CategoryWithBooks";
import { useEffect } from 'react';
import BtnHome from "../../components/pageend/BtnHome";

const CategoryPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams<{ id: string }>();

    const categoryId = id ? parseInt(id) : null;

    if (!categoryId) {
        return <p>Invalid category ID</p>;
    }

    return (
        <>
            <CategoryWithBooks categoryId={categoryId} />
            <BtnHome />
        </>
    );
};

export default CategoryPage;