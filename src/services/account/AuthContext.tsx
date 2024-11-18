import React, { createContext, useContext, useState, ReactNode } from 'react';
import './UserProfileDto';
import { UserProfileDto } from './UserProfileDto';

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

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = 'https://bookwyrmapi2.azurewebsites.net/api/account';

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

  const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });

    if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUsername(username);
        setRole(data.role); // Sets the role from the response
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('role', data.role); // stores the role in localStorage
    } else {
        throw new Error('Login failed');
    }
};

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

  const getUserProfile = async (username: string) => {
    const response = await fetch(`${API_URL}/${username}`, {
      method: 'GET',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
  
    const data = await response.json();
    return data;
  };

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