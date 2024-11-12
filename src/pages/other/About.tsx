import './Other.css';
import BtnHome from '../../components/pageend/BtnHome';

const About = () => {
    return(
        <div className="context-page">
            <h1>Welcome!</h1>
            <p>This website is a <b>demo e-commerce platform</b> I created to showcase my skills and abilities as a full-stack web developer. While the site is fully functional, it is not a real online store. Its purpose is to demonstrate my expertise in modern web technologies, including:</p>
            <ul>
                <li><b>.NET Core 8</b> for back-end development</li>
                <li><b>React</b> with <b>TypeScript</b> for front-end development</li>
                <li>Integration with <b>Identity</b> for authentication</li>
                <li>Building responsive and user-friendly interfaces</li>
                <li>Creating robust, scalable applications</li>
            </ul>
            <h3>I apologize for any confusion, especially if you are a real customer trying to buy your favorite book online &#x1F642;</h3>
            <h3>Why I Built This:</h3>
            <p>I wanted to give potential employers a clear picture of my capabilities by creating a real-world, working application. This project serves as a portfolio piece, highlighting my ability to build both the front-end and back-end of a full-stack application.</p>
            <p>Feel free to explore, and if you have any questions or would like to discuss my work further, please reach out.</p>
            <p>Thank you for visiting!</p>
            <BtnHome />
        </div>
    )
}

export default About;