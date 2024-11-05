import React from "react";

const charactersShown = 100;

function Sidebar({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) {
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
  );

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>

        <button onClick={onAddNote}>Add</button>
      </div>

      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            key={note._id}
            className={`app-sidebar-note ${
              note._id === activeNote ? "active" : ""
            }`}
            onClick={() => setActiveNote(note._id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note._id);
                }}
              >
                Delete
              </button>
            </div>

            <p>
              {note.content &&
                note.content.substring(0, charactersShown) +
                  (note.content.length > charactersShown ? "..." : "")}
            </p>

            <small className="note-meta">
              Last modified{" "}
              {new Date(note.lastModified).toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
