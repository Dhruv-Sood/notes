import { useState } from 'react';

const NoteModal = ({ isOpen, onClose, note, onEdit, onDelete, isEditing }) => {
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(note.id, editedTitle, editedContent);
        onClose();
    };

    return (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl mx-4 h-[70vh] flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="text-3xl font-bold mb-4 bg-transparent text-white border-b border-gray-600 focus:outline-none focus:border-blue-500"
                        placeholder="Untitled"
                        disabled={!isEditing}
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="flex-grow text-gray-300 text-lg mb-6 bg-transparent resize-none focus:outline-none"
                        placeholder="No content"
                        disabled={!isEditing}
                    />
                    <div className="flex justify-end space-x-4 mt-4">
                        {isEditing ? (
                            <>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={onClose}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => onDelete(note.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Delete
                                </button>
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
};

export default NoteModal;