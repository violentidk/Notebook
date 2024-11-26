document.addEventListener("DOMContentLoaded", () => {
  /** NOTEBOOK FUNCTIONALITY **/

  const notesContainer = document.getElementById("notes-container");
  const addNoteButton = document.getElementById("add-note-btn");

  const loadNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = ""; // Clear current notes
    savedNotes.forEach((note, index) => {
      createNoteElement(note, index);
    });
  };

  const createNoteElement = (content, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.placeholder = "Write your note here...";
    textarea.addEventListener("input", saveNotes);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-note";
    deleteButton.textContent = "✖";
    deleteButton.addEventListener("click", () => {
      deleteNote(index);
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(deleteButton);
    notesContainer.appendChild(noteDiv);
  };

  const saveNotes = () => {
    const notes = Array.from(notesContainer.querySelectorAll("textarea")).map(
      (textarea) => textarea.value
    );
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const deleteNote = (index) => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  };

  addNoteButton.addEventListener("click", () => {
    createNoteElement("", -1); // Add a blank note
    saveNotes();
  });

  loadNotes();
});
