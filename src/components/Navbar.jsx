import React from 'react';

const Navbar = ({ user, onSignOut, onSignIn }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Notes</div>
        {user ? (
          <div className="flex items-center">
            <span className="text-white mr-4">{user.displayName}</span>
            <button
              onClick={onSignOut}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;