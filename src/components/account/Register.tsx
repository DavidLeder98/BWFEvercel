import React, { useState } from 'react';
import { useAuth } from '../../services/account/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Account.css';
import './AccBtn.css'

const Register = () => {
  const { register, login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(username, email, password); // Calls the register function
      await login(username, password); // Automatically logs in the user after successful registration
      navigate('/account');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="account-component-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="account-input-container">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="account-input"
          />
        </div>
        <div className="account-input-container">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="account-input"
          />
        </div>
        <div className="account-input-container">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            className="account-input" 
          />
        </div>
        <div className="account-input-container">
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
            className="account-input" 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to="/login" className="reg-link">Already have an account?</Link>
        <div className="albc">
          <button className="reg-btn" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;