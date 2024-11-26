document.addEventListener("DOMContentLoaded", function () {
  const notesContainer = document.getElementById("notes-container");
  const addNoteButton = document.getElementById("addNoteButton");

  // Load existing notes from localStorage
  const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note) => {
      createNoteElement(note);
    });
  };

  // Save notes to localStorage
  const saveNotes = () => {
    const notes = [];
    document.querySelectorAll(".note textarea").forEach((textarea) => {
      notes.push(textarea.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // Create a new note element
  const createNoteElement = (content = "") => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.placeholder = "Write your note here...";
    textarea.addEventListener("input", saveNotes);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-note");
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => {
      noteDiv.remove();
      saveNotes();
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(deleteButton);
    notesContainer.appendChild(noteDiv);
  };

  // Add new note
  addNoteButton.addEventListener("click", () => {
    createNoteElement();
  });

  // Load notes on page load
  loadNotes();
});
