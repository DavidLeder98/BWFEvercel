import AllCategories from "../../components/allcategories/AllCategories";
import { useEffect } from 'react';

const AllCategoriesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <AllCategories />
        </div>
    )
}

export default AllCategoriesPage;