import React, { useState, useEffect } from "react";
import "./EntryPage.css";

function EntryPage() {
  return (
    <>
      <div className="bg-style">
        <div className="header-container">
          <h1 className="header-style">Your pomodoro, user</h1>
        </div>

        <div className="bp-container"></div>
        <div className="sp-container"></div>
      </div>
    </>
  );
}

export default EntryPage;
