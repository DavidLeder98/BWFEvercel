import './AllCategories.css';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/category/CategoryService';
import { CategoryListDto } from '../../services/category/CategoryListDto';
import { Link } from 'react-router-dom';
import PageEnd from '../pageend/PageEnd';

const AllCategories = () => {
    const [categories, setCategories] = useState<CategoryListDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (err) {
                setError('Failed to load categories');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="all-categories">
            <h1 className="ac-h1">All Categories</h1>
            <ul className="ac-ul">
                {categories.map((category) => (
                    <Link to={`/category/${category.id}`} key={category.id}>
                        <div className="ac-li-container">
                            <li key={category.id} className="ac-li">{category.name}</li>
                        </div>
                    </Link>
                ))}
            </ul>
            <PageEnd />
        </div>
    );
};

export default AllCategories;