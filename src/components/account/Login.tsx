import { useState } from 'react';
import { useAuth } from '../../services/account/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Account.css';

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
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {/* Display error message if login fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;