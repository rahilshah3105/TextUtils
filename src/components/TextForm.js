import React, { useState } from 'react'

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("Uppercase was Clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Text Converted to Uppercase", "success");
  }

  const handleLowClick = () => {
    // console.log("Uppercase was Clicked" + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Text Converted to Lowercase", "success");
  }

  const handleClearClick = () => {
    // console.log("Uppercase was Clicked" + text);
    let newText = '';
    setText(newText);
    props.showAlert("Clear Text", "success");
  }

  const handleOnChange = (event) => {
    // console.log("On Change");
    setText(event.target.value);
  }

  const handleCopyText = () => {
    // console.log("Copy Text in your Clipboard " + text);
    let newText = document.getElementById("myBox");
    newText.select();
    navigator.clipboard.writeText(newText.value);
    props.showAlert("Text Copied to Clipboard", "success");
  }

  const handleExtarSpaces = () => {
    // console.log("Remove Extra Spaces from the Paragraph");
    let newText = text.split(/[ ] + /);
    setText(newText.join(" "));
    props.showAlert("Remove extra spaces from the text", "success");
  }

  const [text, setText] = useState('');
  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#042743' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} id="myBox" rows="6"></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-2" onClick={handleLowClick}>Convert to Lowercase</button>
        <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>
        <button className="btn btn-primary mx-2" onClick={handleCopyText}>Copy Text</button>
        <button className="btn btn-primary mx-2" onClick={handleExtarSpaces}>Remove Extra Spaces</button>
      </div>

      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h2>Your text summary</h2>
        <p>{text.split(" ").length} Words and {text.length} Characters</p>
        <p>{0.008 * text.split(" ").length} Minutes read</p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Enter somthing in the textbox above to preview it here"}</p>
      </div>
    </>
  )
}
