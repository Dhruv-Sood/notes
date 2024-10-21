// Import necessary dependencies
import React from 'react';
import DisplayNotes from "./DisplayNotes";
import { useNavigate } from 'react-router-dom';

// Notes component definition
const Notes = ({ user }) => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle creation of a new note
  const handleCreateNote = () => {
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">My Notebook</h1>
        <div className="space-y-8">
          <section className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-purple-300">Your Notes</h2>
              {/* Button to create a new note */}
              <button
                onClick={handleCreateNote}
                className="text-white hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            {/* Component to display user's notes */}
            <DisplayNotes user={user} onCreateNote={handleCreateNote} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notes;