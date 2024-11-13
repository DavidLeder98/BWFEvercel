import Authors from "../../components/authors/Authors";
import { useEffect } from 'react';

const AuthorsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <Authors />
        </div>
    )
}

export default AuthorsPage;