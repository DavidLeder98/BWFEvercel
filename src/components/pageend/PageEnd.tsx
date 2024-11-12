import './PageEnd.css';
import './BtnHome';
import './BtnProducts';
import BtnHome from './BtnHome';
import BtnProducts from './BtnProducts';

const PageEnd = () => {
    return (
        <div className="page-end-container">
            <BtnHome />
            <BtnProducts />
        </div>
    )
}

export default PageEnd;