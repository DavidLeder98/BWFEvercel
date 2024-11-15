import Bundle from '../../components/bundle/Bundle';
import Hero from '../../components/banners/Hero';
import AuthorsBanner from '../../components/banners/AuthorsBanner';
import DealsBanner from '../../components/banners/DealsBanner';
import BtnProducts from '../../components/pageend/BtnProducts';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Hero />
            <Bundle id={1} />
            <Bundle id={1} />
            <DealsBanner />
            <Bundle id={1} />
            <Bundle id={1} />
            <AuthorsBanner />
            <Bundle id={1} />
            <Bundle id={1} />
            <BtnProducts />
        </div>
    );
};

export default Home;