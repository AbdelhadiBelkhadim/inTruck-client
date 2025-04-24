import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('https://intruck-backend-production.up.railway.app/auth/profile', {
          withCredentials: true,
        });
        setUser(response.data.user); // assumes your backend sends { user }
      } catch (error) {
        setUser(null); // not logged in
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post(
        'https://intruck-backend-production.up.railway.app/auth/login',
        { email, password },
        { withCredentials: true }
      );

      // Fetch user profile after login
      const response = await axios.get('https://intruck-backend-production.up.railway.app/auth/profile', {
        withCredentials: true,
      });

      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'https://intruck-backend-production.up.railway.app/auth/logout',
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

