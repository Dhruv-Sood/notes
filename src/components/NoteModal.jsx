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
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl mx-4 h-[70vh] flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    {/* Input for note title */}
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="text-3xl font-bold mb-4 bg-transparent text-white border-b border-gray-600 focus:outline-none focus:border-blue-500"
                        placeholder="Untitled"
                        disabled={!isEditing}
                    />
                    {/* Textarea for note content */}
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="flex-grow text-gray-300 text-lg mb-6 bg-transparent resize-none focus:outline-none"
                        placeholder="No content"
                        disabled={!isEditing}
                    />
                    {/* Buttons for actions */}
                    <div className="flex justify-end space-x-4 mt-4">
                        {isEditing ? (
                            <>
                                {/* Save button */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Save
                                </button>
                                {/* Cancel button */}
                                <button
                                    onClick={onClose}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Delete button */}
                                <button
                                    onClick={() => onDelete(note.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Delete
                                </button>
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
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
