import React, { useState, useEffect } from "react";
import PomodoroTimer from "./PomodoroTimer";
import lightbulb from "../../assets/lightbulb.png";

function BasicPomodoro() {
  return (
    <>
      <div style={bgStyle}>
        <h1 style={headerStyle}>Your pomodoro, user</h1>
        <div style={contentWrapperStyle}>
          <div style={containerStyle}>
            {/* SESSION PLANNER */}
            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            ></button>

            <div style={timerContainerStyle}>
              <PomodoroTimer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const bgStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f7f9fc",
  fontFamily: "'Arial', sans-serif",
  padding: "20px",
};

const headerStyle = {
  textAlign: "start",
  fontSize: "3rem",
  color: "#333",
  margin: "20px 0",
};

const contentWrapperStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  position: "relative",
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const buttonStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  width: "55px",
  height: "55px",
  backgroundColor: "#007bff",
  backgroundImage: `url(${lightbulb})`,
  backgroundSize: "70%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  transition: "background-color 0.2s ease",
};

const timerContainerStyle = {
  marginTop: "20px",
};

export default BasicPomodoro;
