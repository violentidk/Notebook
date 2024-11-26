// script.js
document.addEventListener('DOMContentLoaded', function() {
  const addNoteButton = document.getElementById('addNoteButton');
  const notesContainer = document.getElementById('notes-container');

  // Function to create a new note
  function createNote() {
    // Create note div
    const note = document.createElement('div');
    note.classList.add('note');

    // Add textarea to the note
    const textarea = document.createElement('textarea');
    textarea.placeholder = "Write your note here...";

    // Add delete button to the note
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-note');
    deleteButton.textContent = 'X';

    // Delete note functionality
    deleteButton.addEventListener('click', function() {
      note.remove();
    });

    // Append elements to the note
    note.appendChild(textarea);
    note.appendChild(deleteButton);
    notesContainer.appendChild(note);
  }

  // Event listener for the "Add Note" button
  addNoteButton.addEventListener('click', createNote);
});
