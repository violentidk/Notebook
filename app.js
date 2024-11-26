// app.js
document.addEventListener("DOMContentLoaded", () => {
  const addNoteButton = document.getElementById("add-note");
  const notesContainer = document.getElementById("notes-container");

  // Load notes from localStorage
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(savedNotes));
  };

  const createNoteElement = (noteText, index) => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
      <textarea>${noteText}</textarea>
      <button class="delete-note">×</button>
    `;

    // Update the note in localStorage when text is modified
    note.querySelector("textarea").addEventListener("input", (e) => {
      savedNotes[index] = e.target.value;
      saveNotes();
    });

    // Delete note when the button is clicked
    note.querySelector(".delete-note").addEventListener("click", () => {
      savedNotes.splice(index, 1);
      saveNotes();
      renderNotes(); // Re-render all notes
    });

    return note;
  };

  const renderNotes = () => {
    notesContainer.innerHTML = ""; // Clear all notes before re-rendering
    savedNotes.forEach((note, index) => {
      notesContainer.appendChild(createNoteElement(note, index));
    });
  };

  // Add new note
  addNoteButton.addEventListener("click", () => {
    savedNotes.push(""); // Add an empty note
    saveNotes();
    renderNotes(); // Re-render notes to include the new one
  });

  renderNotes(); // Initial render on page load
});
