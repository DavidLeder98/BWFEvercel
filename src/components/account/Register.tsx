import React, { useState } from 'react';
import { useAuth } from '../../services/account/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom'; // To redirect after successful registration
import { Link } from 'react-router-dom';
import './Account.css';
import './AccBtn.css'

const Register = () => {
  const { register, login } = useAuth(); // Destructure register and login functions from AuthContext
  const [username, setUsername] = useState(''); // State for username
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [error, setError] = useState<string | null>(null); // To handle error messages
  const navigate = useNavigate(); // To navigate after successful registration

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(username, email, password); // Call the register function
      await login(username, password); // Automatically log in the user after successful registration
      navigate('/'); // Redirect to homepage or any other route after registration and login
    } catch (err) {
      setError((err as Error).message); // Handle error with specific message
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
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display specific error messages */}
        <Link to="/login" className="reg-link">Already have an account?</Link>
        <div className="albc">
          <button className="reg-btn" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;