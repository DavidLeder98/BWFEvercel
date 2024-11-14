import { useState } from 'react';
import { useAuth } from '../../services/account/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Account.css';
import './AccBtn.css'

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // React Router's navigate function
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null);
      await login(username, password);

      // Redirect to home page or protected page
      navigate('/account');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="account-component-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="account-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="account-input"
      />
      <Link to="/register" className="reg-link">Don't have an account?</Link>
      <div className="albc">
        <button className="reg-link" onClick={handleLogin}>Login</button>
      </div>

      {/* Display error message if login fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;