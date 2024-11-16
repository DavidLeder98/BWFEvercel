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
            <Bundle id={2} />
            <DealsBanner />
            <Bundle id={7} />
            <Bundle id={4} />
            <AuthorsBanner />
            <Bundle id={8} />
            <Bundle id={3} />
            <BtnProducts />
        </div>
    );
};

export default Home;