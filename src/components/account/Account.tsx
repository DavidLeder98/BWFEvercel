import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/account/AuthContext';
import './Account.css';
import './AccBtn.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddNotification from '../notification/AddNotification';

const Account: React.FC = () => {
  const { isAuthenticated, username, getUserProfile } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const message = location.state?.message; // Retrieves the message from location state
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Fetches user profile when component loads
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (isAuthenticated && username) {
          const profileData = await getUserProfile(username); // Passes username here
          setUserProfile(profileData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, getUserProfile, username]);

  if (!isAuthenticated) {
    return <div>Please log in to view your account information.</div>;
  }

  useEffect(() => {
    if (message) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Sets timer for 3000 ms (3 seconds)

      return () => clearTimeout(timer); // Cleans up the timer on unmount
    }
  }, [message]);

  return (
    <div className="account-details-container">
      {showNotification && <AddNotification message={message} />}
      {loading ? (
        <p>Loading user profile...</p>
      ) : (
        <div className="account-info">
          <h1>Account Information</h1>
          <p><strong>Username:</strong> {userProfile?.username}</p>
          <p><strong>Email:</strong> {userProfile?.email}</p>
          <p><strong>First Name:</strong> {userProfile?.firstName}</p>
          <p><strong>Last Name:</strong> {userProfile?.lastName}</p>
          <p><strong>Phone Number:</strong> {userProfile?.telNumber}</p>
          <p><strong>Address:</strong> {userProfile?.address}</p>
          <p><strong>City:</strong> {userProfile?.city}</p>
          <p><strong>State:</strong> {userProfile?.state}</p>
          <p><strong>Zip Code:</strong> {userProfile?.zipCode}</p>
        </div>
      )}
      <div className="albc2">
        <Link className="reg-btn" to="/account/update">Edit Details</Link>
      </div>
    </div>
  );
};

export default Account;