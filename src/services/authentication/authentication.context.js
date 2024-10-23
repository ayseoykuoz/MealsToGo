import React, { useState, createContext, useEffect } from 'react';
import { auth } from '../../infrastructure/firebase/firebase'; // Import the auth object from firebase.js
import { loginRequest } from './authentication.service'; // Assuming your login service

// Create the Authentication Context
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Firebase Auth State Listener (onAuthStateChanged)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, []);

  // Login function using Firebase Auth
  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password) // Use loginRequest with the auth object
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  // Register function using Firebase Auth
  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      setIsLoading(false);
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password) // Register new user
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  // Logout function using Firebase Auth
  const onLogout = () => {
    setIsLoading(true);
    auth.signOut().then(() => {
      setUser(null);
      setError(null);
      setIsLoading(false);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
