import React, { useState, useEffect } from "react";
import "./EntryPage.css";
import EPForm from "./EPForm";

function EntryPage() {
  return (
    <>
      <div className="ep-bg-style">
        <div className="ep-header-container">
          <h1 className="ep-header-style">Your pomodoro, user</h1>
        </div>

        <div className="ep-content-wrapper-style">
          <div className="ep-container-style">
            <div className="ep-bp-container">
              <EPForm />
            </div>
            <div className="ep-sp-container"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntryPage;
