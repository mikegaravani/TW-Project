import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './note-components/Sidebar';
import Notepad from './note-components/Notepad';
import './note-components/note-style.css';

function Notes() {

    const [notes, setNotes] = useState([]);

    const onAddNote = () => {
        console.log('Adding a note');
        const newNote = {
            // TODO GET KEYS FROM BACKEND
            id: id,// TODO GET ID FROM BACKEND
            title: 'Untitled Note',
            body: '',
            lastModified: Date.now(),
        }
    }

    return (

    <div className='App'>
        <Sidebar notes={notes} onAddNote={onAddNote} />
        <Notepad />
    </div> 
    )
}

export default Notes