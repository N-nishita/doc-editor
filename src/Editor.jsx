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

    if (start === end) return;

    const selected = textarea.value.slice(start, end);
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);

    const wrapped = `<${tag}>${selected}</${tag}>`;
    const newValue = before + wrapped + after;

    setContent(newValue);   
    textarea.value = newValue; 

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(before.length + wrapped.length, before.length + wrapped.length);
    }, 0);
  };

  const applyColorImmediately = (selectedColor) => {
    const textarea = textRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);

    let insert = "";
    if (start === end) {
      insert = `<span style="color:${selectedColor}"></span>`;
    } else {
      const selectedText = textarea.value.slice(start, end);
      insert = `<span style="color:${selectedColor}">${selectedText}</span>`;
    }

    const newValue = before + insert + after;
    setContent(newValue);
    textarea.value = newValue;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(before.length + insert.length, before.length + insert.length);
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
