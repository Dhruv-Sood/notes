import React from 'react';
import DisplayNotes from "./DisplayNotes";
import { useNavigate } from 'react-router-dom';

const Notes = ({ user }) => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">My Notebook</h1>
        <div className="space-y-8">
          <section className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold mb-8 text-purple-300">Your Notes</h2>
            <DisplayNotes user={user} onCreateNote={handleCreateNote} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notes;