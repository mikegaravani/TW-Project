import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

function HomePage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/events/home', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        console.log('Protected data:', response.data);
    })
    .catch(error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token is invalid or missing, redirect to login
            navigate('/login');
        } else {
            console.error('Error fetching protected route:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    });
}, [navigate]);



  return (
    <>

      <div>hdhdhdhhdhdhdhdhhdhd you in, this is protected content and requires a token, right??</div>
      { error && <Alert variant='danger'>{ error }</Alert> }
      <h2 className='text-center mb-4'>Profile</h2>
      {/* <Button variant='link' onClick={handleLogout}>Log out</Button> */}




    </>
  )
}

export default HomePage