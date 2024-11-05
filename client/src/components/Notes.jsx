import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import "./note-components/note-style.css";
import Sidebar from "./note-components/Sidebar";
import NoteView from "./note-components/NoteView";

function Notes() {
  // Array of notes
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  // TODO if token is not present, navigate to login

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `${token}`,
    },
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axiosInstance.get("/notes/all");
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes", error);
      }
    };
    fetchNotes();
  }, []);

  // Add a note
  const onAddNote = async () => {
    // Note object
    const newNote = {
      title: "Untitled Note",
      content: "",
    };

    try {
      const { data } = await axiosInstance.post("/notes/new", newNote);
      setNotes([data, ...notes]);
      setActiveNote(data._id);
    } catch (error) {
      console.error("Error adding note", error);
    }
  };

  const onUpdateNote = async (updatedNote) => {
    try {
      const { data } = await axiosInstance.put(
        `/notes/update/${activeNote}`,
        updatedNote
      );
      const updatedNotesArray = notes.map((note) =>
        note._id === activeNote ? data : note
      );

      setNotes(updatedNotesArray);
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  const onDeleteNote = async (idToDelete) => {
    try {
      await axiosInstance.delete(`/notes/delete/${idToDelete}`);
      setNotes(notes.filter((note) => note._id !== idToDelete));
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const getActiveNote = () => {
    return notes.find((note) => note._id === activeNote);
  };

  return (
    <>
      <div className="App">
        <button onClick={() => navigate("/")}>BACK HOME</button>
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <NoteView activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </>
  );
}

export default Notes;
