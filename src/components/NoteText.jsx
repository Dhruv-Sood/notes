// import React, { useState } from 'react';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../firebase';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const NoteText = ({ user }) => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!user) {
//             alert('Please sign in to add a note.');
//             return;
//         }
//         try {
//             const notesCollection = collection(db, 'notes');
//             await addDoc(notesCollection, {
//                 title,
//                 content,
//                 createdAt: new Date(),
//                 userId: user.uid
//             });
//             setTitle('');
//             setContent('');
//             alert('Note added successfully!');
//         } catch (error) {
//             console.error('Error adding note: ', error);
//             alert('Failed to add note. Please try again.');
//         }
//     };

//     return (
//         <div className="w-full bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl">
//             <form onSubmit={handleSubmit} className="space-y-6 p-6">
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full p-3 bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-400"
//                 />
//                 <textarea
//                     placeholder="Content"
//                     rows="6"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     className="w-full p-3 bg-gray-700 bg-opacity-50 text-white border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-400"
//                 ></textarea>
//                 <button
//                     type="submit"
//                     className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-[1.02]"
//                 >
//                     Add Note
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default NoteText;
