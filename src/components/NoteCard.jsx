// Import necessary dependencies
import React, { useState } from 'react';
import NoteModal from './NoteModal';

// NoteCard component definition
const NoteCard = ({ note, onEdit, onDelete }) => {
    // State for controlling modal visibility and edit mode
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Maximum length for content preview
    const maxContentLength = 100;

    // Truncate content if it exceeds maxContentLength
    const truncatedContent = note.content && note.content.length > maxContentLength
        ? `${note.content.substring(0, maxContentLength)}...`
        : note.content || '';

    // Handler for edit button click
    const handleEdit = () => {
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Handler for closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
    };

    // Format the createdAt date
    const formattedDate = note.createdAt ? new Date(note.createdAt.toDate()).toLocaleString() : 'Unknown date';

    return (
        <>
            {/* Main note card container */}
            <div 
                className={`bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] flex flex-col cursor-pointer ${isHovered ? 'border-blue-500/50' : 'border-gray-700'} border`}
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Note content section */}
                <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{note.title || 'Untitled'}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">{truncatedContent}</p>
                    <p className="text-gray-400 text-sm mt-6 font-light italic">Created: {formattedDate}</p>
                </div>
                {/* Note actions section (edit and delete buttons) */}
                <div className={`bg-gray-700 px-8 py-4 flex justify-end space-x-6 mt-auto transition-all duration-300 ${isHovered ? 'bg-opacity-90' : 'bg-opacity-50'}`}>
                    {/* Edit button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit();
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-all duration-300 focus:outline-none hover:scale-110 rounded-full p-2 hover:bg-blue-500/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    {/* Delete button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(note.id);
                        }}
                        className="text-red-400 hover:text-red-300 transition-all duration-300 focus:outline-none hover:scale-110 rounded-full p-2 hover:bg-red-500/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* NoteModal component for viewing/editing the full note */}
            <NoteModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                isEditing={isEditing}
            />
        </>
    );
};

export default NoteCard;
