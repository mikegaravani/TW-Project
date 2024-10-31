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
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // Token is invalid or missing, redirect to login
          navigate("/login");
        } else {
          console.error("Error fetching protected route:", error);
          setError("An unexpected error occurred. Please try again later.");
          setLoading(false);
        }
      });
  }, [navigate]);

  return (
    <>
      <div>
        hdhdhdhhdhdhdhdhhdhd you in, this is protected content and requires a
        token, right??
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
