import './Other.css';
import BtnHome from '../../components/pageend/BtnHome';

const Sorry = () => {
    return(
        <div className="context-page">
            <h1>Sorry!</h1>
            <h2>The feature you're trying to access hasn't been implemented yet.</h2>
            <h3>I apologize for any confusion, especially if you are a real customer trying to buy your favorite book online &#x1F642;</h3>
            <p>This website is a <b>demonstration project</b> created solely for the purpose of showcasing my skills and abilities to potential employers. While it is designed to resemble a fully functioning e-commerce platform, please note that it is not a real website and does not support actual transactions or purchases.</p>
            <p>I appreciate your understanding and hope that you find the design, functionality, and features of this project reflective of my expertise in web development, design, and user experience.</p>
            <p>If you have any questions or would like to discuss my work further, please feel free to reach out!</p>
            <p>Thank you for your understanding!</p>
            <BtnHome />
        </div>
    )
}

export default Sorry;