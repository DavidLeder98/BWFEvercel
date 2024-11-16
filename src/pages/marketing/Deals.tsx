import Bundle from '../../components/bundle/Bundle';
import AuthorsBanner from '../../components/banners/AuthorsBanner';
import PageEnd from '../../components/pageend/PageEnd';
import { useEffect } from 'react';

const Deals = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <AuthorsBanner />
            <Bundle id={2} />
            <Bundle id={6} />
            <Bundle id={4} />
            <Bundle id={3} />
            <PageEnd />
        </div>
    );
};

export default Deals;