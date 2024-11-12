import { useParams } from "react-router-dom";
import CategoryWithBooks from "../../components/categorywithbooks/CategoryWithBooks";

const CategoryPage = () => {
    const { id } = useParams<{ id: string }>();

    // Safely parse the id and handle cases where id is undefined
    const categoryId = id ? parseInt(id) : null;

    if (!categoryId) {
        return <p>Invalid category ID</p>; // Handle the case where id is invalid or not present
    }

    return (
        <CategoryWithBooks categoryId={categoryId} />
    );
};

export default CategoryPage;