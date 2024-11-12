import React, { createContext, useContext, useState, ReactNode } from 'react';
import './UserProfileDto';
import { UserProfileDto } from './UserProfileDto';

// Define the structure of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  username: string | null;
  getUserProfile: (username: string) => Promise<any>;
  updateUserProfile: (username: string, userProfile: UserProfileDto) => Promise<void>;
}

// Define the props for the AuthProvider, including children
interface AuthProviderProps {
  children: ReactNode;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = 'https://bookwyrmapi2.azurewebsites.net/api/account';

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem('role');
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username');
  });

  // Register function to call the register API endpoint
  const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
      credentials: 'include',
    });
    
    if (response.ok) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
    } else {
      const errorData = await response.json();
      let errorMessage = 'Registration failed';

      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors)
          .flat()
          .join();
        errorMessage = errorMessages;
      } else if (typeof errorData === 'object' && errorData.message) {
        errorMessage = errorData.message;
      }

      throw new Error(errorMessage);
    }
  };

  // Login function to call the login API endpoint
  const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });

    if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setIsAuthenticated(true);
        setUsername(username);
        setRole(data.role); // Set the role from the response
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('role', data.role); // Optionally store the role in localStorage
    } else {
        throw new Error('Login failed');
    }
};

  // Logout function to call the logout API endpoint
  const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      setIsAuthenticated(false);
      setRole(null);
      setUsername(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    } else {
      throw new Error('Logout failed');
    }
  };

  // Fetch user profile
  const getUserProfile = async (username: string) => {
    const response = await fetch(`${API_URL}/${username}`, {
      method: 'GET',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
  
    const data = await response.json();
    return data; // This should return the user profile object
  };

  // Update user profile function
  const updateUserProfile = async (username: string, userProfile: UserProfileDto) => {
    const response = await fetch(`${API_URL}/update-profile/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Failed to update user profile');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, username, register, login, logout, getUserProfile, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};