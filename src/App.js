import React from "react";
import Editor from "./Editor";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="editor-title">Interactive Document Editor</h1>
      <h2 className="subheading">Write, Format, and Preview Your Documents in Real Time</h2>

      <Editor />
    </div>
  );
}

export default App;

