import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

function HomePage() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/events/home", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUsername(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.status === 403 ||
            // TODO handle 500 error better (possibly remove this)
            error.response.status === 500)
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error("Error fetching protected route:", error);
          setError("An unexpected error occurred. Please try again later.");
          setLoading(false);
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <>
      <div>
        <button onClick={handleLogout}>LOGOUT</button>
        <br />
        <button onClick={() => navigate("/note-editor")}>Your Notes</button>
        <br />
        <button onClick={() => navigate("/pomodoro")}>Pomodoro</button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <h2 className="text-center mb-4">Welcome, {username}</h2>
      )}
    </>
  );
}

export default HomePage;
