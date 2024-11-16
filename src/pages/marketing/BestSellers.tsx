import Bundle from '../../components/bundle/Bundle';
import DealsBanner from '../../components/banners/DealsBanner';
import PageEnd from '../../components/pageend/PageEnd';
import { useEffect } from 'react';

const BestSellers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <DealsBanner />
            <Bundle id={9} />
            <Bundle id={8} />
            <Bundle id={10} />
            <PageEnd />
        </div>
    );
};

export default BestSellers;