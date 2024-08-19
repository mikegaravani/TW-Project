import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import { Container } from 'react-bootstrap';
import HomePage from './components/HomePage';
import Login from './components/Login';

function App() {
  
  return (
    <Router>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: '400px' }}>

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>


        </div> 
      </Container>
    </Router>
  )
}

export default App