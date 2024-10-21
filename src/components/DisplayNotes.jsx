// Import necessary dependencies from React and Firebase
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import NoteCard from './NoteCard';
// Initialize Firebase app and get Firestore instance
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DisplayNotes = ({ user, onCreateNote }) => {
  // State to store the user's notes
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    const fetchNotes = async () => {
      if (user) {
        // Create a query to get notes for the current user
        const q = query(collection(db, 'notes'), where('userId', '==', user.uid));
        // Set up a real-time listener for the notes
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setNotes(fetchedNotes);
        });
      }
    };

    fetchNotes();

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  // Function to handle note deletion
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
  };

  // Function to handle note editing
  const handleEdit = async (id, newTitle, newContent) => {
    await updateDoc(doc(db, 'notes', id), { title: newTitle, content: newContent });
  };

  return (
    <div>
      {/* Grid to display notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {/* Button to create a new note */}
      {/* <div className="flex justify-end mt-6 px-4">
        <button
          onClick={onCreateNote}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create New Note
        </button>
      </div> */}
    </div>
  );
};



export default DisplayNotes;