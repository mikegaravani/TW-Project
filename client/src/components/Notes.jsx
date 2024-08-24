import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './note-components/Sidebar';
import Notepad from './note-components/Notepad';
import { Card, Button, Alert, Spinner } from 'react-bootstrap'
import './note-components/note-style.css';
import axios from 'axios';

function Notes() {

    // const [notes, setNotes] = useState([]);
    // const [error, setError] = useState('');
    // const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    // useEffect(() => {

    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         navigate('/login');
    //         return;
    //     }
    //     axios.get('/notes/all', {
    //         headers: {
    //             'Authorization': token
    //         }
    //     })
    //     .then(response => {
    //       setNotes(response.data);
    //       setLoading(false);
    //     })
    //     .catch(error => {
    //         setError('An unexpected error occurred. Please try again later.');
    //         setLoading(false);
    //     });

    // }, [navigate]);

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