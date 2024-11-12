import './CategoriesDropdown.css';
import { getAllCategories } from '../../services/category/CategoryService';
import { CategoryListDto } from '../../services/category/CategoryListDto';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';


const CategoriesDropdown = () => {
    const [categories, setCategories] = useState<CategoryListDto[]>([]); // State to hold categories

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="category-dropdown">
            <ul className="cd-ul">
                {categories.map((category) => (
                    <Link to={`/category/${category.id}`}>
                        <li className="cd-li" key={category.id}>
                            {category.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesDropdown;