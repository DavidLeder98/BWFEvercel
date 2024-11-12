import Bundle from '../../components/bundle/Bundle';
import AuthorsBanner from '../../components/banners/AuthorsBanner';
import PageEnd from '../../components/pageend/PageEnd';

const Deals = () => {
    return (
        <div>
            <AuthorsBanner />
            <Bundle id={1} />
            <Bundle id={1} />
            <Bundle id={1} />
            <Bundle id={1} />
            <PageEnd />
        </div>
    );
};

export default Deals;