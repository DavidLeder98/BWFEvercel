import { useEffect, useState } from 'react';
import { getAllCategories } from '../../../services/category/CategoryService';
import { CategoryListDto } from '../../../services/category/CategoryListDto';
import '../AdminPanel.css';
import { Link } from 'react-router-dom';

const AdminCategory = () => {
    const [categories, setCategories] = useState<CategoryListDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesList = await getAllCategories();
                setCategories(categoriesList);
                setLoading(false);
            } catch (err) {
                setError('Failed to load categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="admin-panel-container">
            <div className="admin-nav row">
                <Link to="/admin"><h3>Manage Content / </h3></Link>
                <Link to="/admin/category"><h3>Categories / </h3></Link>
            </div>
            <div className="admin-panel col">
                <div className="ap-top row">
                    <h1 className="ap-h1">Manage Categories</h1>
                    <p className="ap-create-new"><Link to="/admin/category/create">+ Create new Category</Link></p>
                </div>
                {loading ? (
                    <p>Loading categories...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className="ap-table">
                        <thead>
                            <tr className="ap-thr">
                                <th className="apt-col-num">#</th>
                                <th className="apt-col-id">Id.</th>
                                <th className="apt-col-name">Name</th>
                                <th className="apt-col-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.id} className="ap-tr">
                                    <td className="apt-col-num">{index + 1}.</td>
                                    <td className="apt-col-id">{category.id}</td>
                                    <td className="apt-col-name">{category.name}</td>
                                    <td className="apt-col-action row">
                                        <Link to={`/admin/category/edit/${category.id}`}>
                                            <div className="ap-btn-list-edit">
                                                <p>Edit</p>
                                            </div>
                                        </Link>
                                        <Link to={`/admin/category/delete/${category.id}`}>
                                            <div className="ap-btn-list-delete">
                                                <p>Delete</p>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="ap-btn-back-container row">
                    <Link to="/admin">
                        <div className="ap-btn-back">
                            <p>Back</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminCategory;