import React, { useRef, useState } from "react";
import "./Editor.css";

const Editor = () => {
  const textRef = useRef();
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#000000");

 const applyTag = (tag) => {
  const textarea = textRef.current;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);

  let insert = "";

  if (start === end) {
    // No text selected → insert empty tag pair
    insert = `<${tag}></${tag}>`;
  } else {
    // Text selected → wrap it
    const selected = textarea.value.slice(start, end);
    insert = `<${tag}>${selected}</${tag}>`;
  }

  const newValue = before + insert + after;
  textarea.value = newValue;
  setContent(newValue);

  setTimeout(() => {
    textarea.focus();
    const cursorPos =
      start + (start === end ? tag.length + 2 : insert.length); // put cursor between if no selection
    textarea.setSelectionRange(cursorPos, cursorPos);
  }, 0);
};

const applyColorImmediately = (selectedColor) => {
  const textarea = textRef.current;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);

  let insert = "";
  let cursorOffset = 0;

  if (start === end) {
    // No text selected — insert a span and place cursor between
    insert = `<span style="color:${selectedColor}"></span>`;
    cursorOffset = `<span style="color:${selectedColor}">`.length;
  } else {
    // Text selected — wrap it
    const selectedText = textarea.value.slice(start, end);
    insert = `<span style="color:${selectedColor}">${selectedText}</span>`;
    cursorOffset = insert.length;
  }

  const newValue = before + insert + after;
  textarea.value = newValue;
  setContent(newValue);

  // Move cursor inside empty span or to end of inserted text
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
  }, 0);
};


  return (
    <div className="editor-wrapper">

      <div className="toolbar">
        <button className="toolbar-btn" onClick={() => applyTag("b")}>
          <b>Bold</b>
        </button>

        <button className="toolbar-btn" onClick={() => applyTag("i")}>
          <i>Italic</i>
        </button>

        <div className="color-picker-wrapper">
          <span className="color-label">Text Color</span>
          <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)} 
          onBlur={() => applyColorImmediately(color)}
          className="color-picker"
          />
          </div>
      </div>

      <textarea
        ref={textRef}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="editor-textarea"
        placeholder="Type your document here..."
      />

      <div className="preview">
        <h3>Live Preview:</h3>
        <div
          className="preview-box"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <p className="word-count">Word Count: {content.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length}</p>

    </div>
    
  );
};

export default Editor;
