import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/account/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountUpdate: React.FC = () => {
  const { username, updateUserProfile, getUserProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    telNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (username) {
        try {
          const userProfile = await getUserProfile(username);
          setFormData({
            firstName: userProfile.firstName || '',
            lastName: userProfile.lastName || '',
            telNumber: userProfile.telNumber || '',
            address: userProfile.address || '',
            city: userProfile.city || '',
            state: userProfile.state || '',
            zipCode: userProfile.zipCode || '',
          });
        } catch (err) {
          setError('Failed to load user profile.');
        }
      }
    };

    loadUserProfile();
  }, [username, getUserProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError('Username is required to update the profile.');
      return;
    }
    
    try {
      await updateUserProfile(username, formData);
      // Redirect to /account with a success message
      navigate('/account', { state: { message: 'Profile updated successfully!' } }); 
    } catch (err) {
      const errorMessage = (err as Error).message || 'An error occurred';
      setError(errorMessage);
    }
  };

  return (
    <div className="account-details-container">
      <h2>Update Account Information</h2>
      <form onSubmit={handleSubmit} className="account-component-container">
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="account-input" />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="account-input" />
        <input type="text" name="telNumber" value={formData.telNumber} onChange={handleChange} placeholder="Phone Number" className="account-input" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="account-input" />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="account-input" />
        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="account-input" />
        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" className="account-input" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="albc2">
          <button className="reg-btn" type="submit">Update Details</button>
        </div>
      </form>
    </div>
  );
};

export default AccountUpdate;