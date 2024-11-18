import { useState } from 'react';
import { useAuth } from '../../services/account/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Account.css';
import './AccBtn.css';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      setError(null);
      await login(username, password);
      navigate('/account'); // Redirects to home page or protected page
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="account-component-container">
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to="/register" className="reg-link">Don't have an account?</Link>
        <div className="albc">
          <button className="reg-btn" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
