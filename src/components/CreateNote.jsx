// Import necessary dependencies
import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { useNavigate } from 'react-router-dom';

// Initialize Firebase app and get Firestore instance
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CreateNote = ({ user }) => {
    // State for note title and content
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please sign in to add a note.');
            return;
        }
        try {
            // Get reference to the 'notes' collection
            const notesCollection = collection(db, 'notes');
            // Add new document to the collection
            await addDoc(notesCollection, {
                title,
                content,
                createdAt: new Date(),
                userId: user.uid
            });
            // Clear form fields after successful submission
            setTitle('');
            setContent('');
            alert('Note added successfully!');
        } catch (error) {
            console.error('Error adding note: ', error);
            alert('Failed to add note. Please try again.');
        }
    };

    // Navigate to all notes view
    const handleViewAllNotes = () => {
        navigate('/notes');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-20">
            <div className="w-full max-w-2xl bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl mb-6">
                <h2 className="text-3xl font-bold mb-6 p-6 bg-gray-700 bg-opacity-50 rounded-t-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Create a New Note
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    {/* Input field for note title */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-400"
                    />
                    {/* Textarea for note content */}
                    <textarea
                        placeholder="Content"
                        rows="6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-400"
                    ></textarea>
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-[1.02]"
                    >
                        Add Note
                    </button>
                </form>
            </div>
            {/* Button to view all notes */}
            <div className="w-full max-w-2xl flex justify-end">
                <button
                    type="button"
                    onClick={handleViewAllNotes}
                    className="py-3 px-6 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-[1.02]"
                >
                    View All Notes
                </button>
            </div>
        </div>
    );
};

export default CreateNote;
