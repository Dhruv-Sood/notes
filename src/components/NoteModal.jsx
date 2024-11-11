// Import necessary hooks from React
import { useState } from 'react';
// Import createPortal for rendering the modal outside the component hierarchy
import { createPortal } from 'react-dom';

// NoteModal component for displaying and editing notes
const NoteModal = ({ isOpen, onClose, note, onEdit, onDelete, isEditing }) => {
    // State for managing edited title and content
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);

    // If modal is not open, don't render anything
    if (!isOpen) return null;

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(note.id, editedTitle, editedContent);
        onClose();
    };

    // Modal content
    const modalContent = (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-lg bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900/95 rounded-2xl p-8 w-full max-w-4xl mx-4 h-[80vh] flex flex-col shadow-2xl border border-gray-700/50 transform transition-all duration-300 hover:border-blue-500/30">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    {/* Input for note title */}
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="text-4xl font-bold mb-6 bg-transparent text-white border-b border-gray-700 focus:outline-none focus:border-blue-500 transition-all duration-300 caret-blue-500"
                        placeholder="Untitled"
                        disabled={!isEditing}
                        style={{
                            background: 'transparent',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            backgroundImage: 'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)',
                            WebkitTextFillColor: 'transparent'
                        }}
                    />
                    {/* Textarea for note content */}
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="flex-grow text-gray-300 text-lg mb-6 bg-transparent resize-none focus:outline-none scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-blue-500/50 p-2 caret-blue-500"
                        placeholder="Start typing your note here..."
                        disabled={!isEditing}
                    />
                    {/* Buttons for actions */}
                    <div className="flex justify-end space-x-4 mt-4">
                        {isEditing ? (
                            <>
                                {/* Save button */}
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
                                >
                                    Save Changes
                                </button>
                                {/* Cancel button */}
                                <button
                                    onClick={onClose}
                                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2.5 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Delete button */}
                                <button
                                    onClick={() => onDelete(note.id)}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
                                >
                                    Delete Note
                                </button>
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2.5 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );

    // Use createPortal to render the modal outside the component hierarchy
    return createPortal(
        modalContent,
        document.getElementById('modal-root') // Make sure this element exists in your HTML
    );
};

export default NoteModal;
