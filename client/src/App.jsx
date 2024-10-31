import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/note-editor" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
