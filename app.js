document.addEventListener("DOMContentLoaded", () => {
  /** NOTEBOOK FUNCTIONALI TY **/

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
    textarea.addEventListener("input", () => saveNotes());

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

  /** VOICE MEMO FUNCTIONALITY **/

  const recordBtn = document.getElementById("record-btn");
  const stopBtn = document.getElementById("stop-btn");
  const memosList = document.getElementById("memos");

  let mediaRecorder;
  let audioChunks = [];
  const savedMemos = JSON.parse(localStorage.getItem("voiceMemos")) || [];

  const loadMemos = () => {
    memosList.innerHTML = "";
    savedMemos.forEach((memo, index) => {
      const li = document.createElement("li");

      const audio = document.createElement("audio");
      audio.src = memo;
      audio.controls = true;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑 Delete";
      deleteBtn.style.background = "#ff5c5c";
      deleteBtn.style.color = "white";
      deleteBtn.style.border = "none";
      deleteBtn.style.padding = "5px 10px";
      deleteBtn.style.borderRadius = "5px";

      deleteBtn.addEventListener("click", () => {
        savedMemos.splice(index, 1);
        localStorage.setItem("voiceMemos", JSON.stringify(savedMemos));
        loadMemos();
      });

      li.appendChild(audio);
      li.appendChild(deleteBtn);
      memosList.appendChild(li);
    });
  };

  const saveMemo = (blob) => {
    const url = URL.createObjectURL(blob);
    savedMemos.push(url);
    localStorage.setItem("voiceMemos", JSON.stringify(savedMemos));
    loadMemos();
  };

  recordBtn.addEventListener("click", async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    recordBtn.disabled = true;
    stopBtn.disabled = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/mpeg" });
        saveMemo(blob);
        audioChunks = [];
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Error accessing audio devices:", err);
    }
  });

  stopBtn.addEventListener("click", () => {
    recordBtn.disabled = false;
    stopBtn.disabled = true;

    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
  });

  loadMemos();
});
