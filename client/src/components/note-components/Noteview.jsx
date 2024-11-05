import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function NoteView({ activeNote, onUpdateNote }) {
  const [title, setTitle] = useState(activeNote?.title || "");
  const [content, setContent] = useState(activeNote?.content || "");

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title || "");
      setContent(activeNote.content || "");
    }
  }, [activeNote]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        activeNote &&
        (title !== activeNote.title || content !== activeNote.content)
      ) {
        onUpdateNote({
          ...activeNote,
          title: title,
          content: content,
          lastModified: Date.now(),
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [title, content, activeNote, onUpdateNote]);

  if (!activeNote) return <div className="no-active-note">Your notes!</div>;

  return (
    <>
      <div className="app-main">
        <div className="app-main-note-edit">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            id="content"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
        </div>

        <div className="app-main-note-preview">
          <h1 className="preview-title">{title}</h1>
          <ReactMarkdown className="markdown-preview">{content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default NoteView;
