# My Notebook

My Notebook is a modern, responsive web application for creating and managing personal notes. Built with React and Firebase, it offers a sleek user interface with real-time updates and secure user authentication.

## Features

- User authentication
- Create, read, update, and delete notes
- Real-time updates
- Responsive design for desktop and mobile devices
- Elegant UI with a dark theme and gradient effects

## Technologies Used

- React
- Firebase (Firestore for database, Authentication for user management)
- Tailwind CSS for styling
- React Router for navigation
- Vite as the build tool

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up a Firebase project and add your configuration to `src/firebase.js`
4. Run the development server with `npm run dev`

## Project Structure

- `src/components/`: React components (detailed below)
- `src/firebase.js`: Firebase configuration
- `index.html`: Main HTML file with modal root and app root

### Component Breakdown

#### DisplayNotes.jsx
- Fetches and displays user's notes in real-time
- Uses Firestore queries to get notes for the current user
- Implements note deletion and editing functionality
- Renders a grid of NoteCard components

#### NoteCard.jsx
- Displays individual note with title and truncated content
- Provides edit and delete buttons
- Opens NoteModal for full view and editing
- Implements hover effects and animations

#### NoteModal.jsx
- Allows viewing, editing, and deleting of notes in a modal
- Provides form inputs for title and content
- Implements save, cancel, and close functionality
- Uses React Portals for rendering

#### Notes.jsx
- Main component for the notes page
- Renders the page title and create note button
- Integrates DisplayNotes component
- Handles navigation to create note page

## UI/UX Features

- Gradient backgrounds and text effects
- Blur effects for depth and modern feel
- Responsive grid layout for notes
- Interactive buttons with hover effects
- Modal for focused note viewing and editing

## Firebase Integration

- Real-time data synchronization with Firestore
- User authentication for secure access to personal notes
- CRUD operations on notes collection

## Routing

- Uses React Router for navigation between main notes view and create note page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

