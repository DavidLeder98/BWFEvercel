import Bundle from '../../components/bundle/Bundle';
import DealsBanner from '../../components/banners/DealsBanner';
import PageEnd from '../../components/pageend/PageEnd';

const BestSellers = () => {
    return (
        <div>
            <DealsBanner />
            <Bundle id={1} />
            <Bundle id={1} />
            <Bundle id={1} />
            <PageEnd />
        </div>
    );
};

export default BestSellers;