import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './note-components/Sidebar';
import Notepad from './note-components/Notepad';
import './note-components/note-style.css';

function Notes() {
  return (

    <div className='App'>
        <Notepad />
        <Sidebar />
    </div> 
  )
}

export default Notes