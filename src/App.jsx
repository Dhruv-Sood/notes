// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from './firebase';
import Notes from './components/Notes';
import Cookies from 'js-cookie';
import CreateNote from './components/CreateNote';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Initialize Firebase app and authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  // State to hold user information
  const [user, setUser] = useState(null);

  // Effect to check for saved user data in cookies on component mount
  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Function to handle Google Sign In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
      };
      setUser(userData);
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Save user data in cookies for 7 days
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  // Function to handle Sign Out
  const handleSignOut = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navbar component */}
        <Navbar user={user} onSignOut={handleSignOut} onSignIn={handleGoogleSignIn} />
        <div className="w-full">
          {user ? (
            // Routes for authenticated users
            <Routes>
              <Route path="/notes" element={<Notes user={user} />} />
              <Route path="/create" element={<CreateNote user={user} />} />
              <Route path="*" element={<Navigate to="/notes" replace />} />
            </Routes>
          ) : (
            // Welcome screen for non-authenticated users
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
             
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center bg-white text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;