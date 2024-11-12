import './Other.css';
import BtnHome from '../../components/pageend/BtnHome';

const Privacy = () => {
    return(
        <div className="context-page">
            <h1>Privacy Policy</h1>
            <p>This website is a demonstration project created solely to showcase my web development skills to potential employers, <b>no personal data is collected, stored, or shared.</b></p>
            <p>This website does not process any real transactions, collect payment information, or require users to provide personal data. Any data you may input during your visit, such as filling out forms, is not stored or used in any way.</p>
            <h3>I apologize for any confusion, especially if you are a real customer trying to buy your favorite book online &#x1F642;</h3>
            <p>The sole purpose of this project is to illustrate my ability to develop a fully functioning e-commerce platform, not to collect or manage user information.</p>
            <p>If you have any questions or concerns regarding privacy in the context of this project, feel free to reach out.</p>
            <p>Thank you for visiting!</p>
            <BtnHome />
        </div>
    )
}

export default Privacy;