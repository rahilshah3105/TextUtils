import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [textAlignment, setTextAlignment] = useState("left");

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Text Converted to Uppercase", "success");
  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Text Converted to Lowercase", "success");
  };

  const handleCapitalize = () => {
    let newText = text.split(" ");
    for (let i = 0; i < newText.length; i++) {
      newText[i] = newText[i].charAt(0).toUpperCase() + newText[i].slice(1);
    }
    setText(newText.join(" "));
    props.showAlert("Text Converted to Capitalize", "success");
  };

  const handleTitleCase = () => {
    let newText = text.toLowerCase().split(" ");
    for (let i = 0; i < newText.length; i++) {
      if (newText[i].length > 0) {
        newText[i] = newText[i].charAt(0).toUpperCase() + newText[i].slice(1);
      }
    }
    setText(newText.join(" "));
    props.showAlert("Text Converted to Title Case", "success");
  };

  const handleAlternatingCase = () => {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      newText += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
    }
    setText(newText);
    props.showAlert("Text Converted to Alternating Case", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared", "success");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied to Clipboard", "success");
  };

  const handleExtarSpaces = () => {
    let newText = text.split(/[ ] + /);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed from text", "success");
  };

  const handleFindReplace = () => {
    if (findText && replaceText) {
      let newText = text.replace(new RegExp(findText, 'g'), replaceText);
      setText(newText);
      props.showAlert("Find and Replace completed", "success");
    } else {
      props.showAlert("Please enter both find and replace text", "warning");
    }
  };

  const handleReverseText = () => {
    let newText = text.split('').reverse().join('');
    setText(newText);
    props.showAlert("Text Reversed", "success");
  };

  const handleEncryptText = () => {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        newText += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        newText += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
      } else {
        newText += text[i];
      }
    }
    setText(newText);
    props.showAlert("Text Encrypted (ROT13)", "success");
  };

  const handleDecryptText = () => {
    handleEncryptText(); // ROT13 is symmetric
    props.showAlert("Text Decrypted", "success");
  };

  const handleGenerateLoremIpsum = () => {
    const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    setText(loremText);
    props.showAlert("Lorem Ipsum generated", "success");
  };

  const handleGeneratePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setText(password);
    props.showAlert("Password generated", "success");
  };

  const handleURLEncode = () => {
    let newText = encodeURIComponent(text);
    setText(newText);
    props.showAlert("Text URL Encoded", "success");
  };

  const handleURLDecode = () => {
    try {
      let newText = decodeURIComponent(text);
      setText(newText);
      props.showAlert("Text URL Decoded", "success");
    } catch (error) {
      props.showAlert("Invalid URL encoded text", "danger");
    }
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      props.showAlert("Text to Speech started", "success");
    } else {
      props.showAlert("Text to Speech not supported", "warning");
    }
  };

  // Text analysis functions
  const getWordFrequency = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const frequency = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  const getCharacterFrequency = () => {
    const frequency = {};
    for (let char of text.toLowerCase()) {
      if (char.match(/[a-z]/)) {
        frequency[char] = (frequency[char] || 0) + 1;
      }
    }
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  };

  const getReadabilityScore = () => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const syllables = text.toLowerCase().replace(/[^a-z]/g, '').replace(/[^aeiou]+/g, ' ').trim().split(/\s+/).length;

    if (sentences === 0 || words === 0) return 0;

    const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return Math.round(fleschScore);
  };

  const getTextStats = () => {
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const lines = text.split('\n').length;

    return { words, characters, charactersNoSpaces, sentences, paragraphs, lines };
  };

  const stats = getTextStats();
  const wordFreq = getWordFrequency();
  const charFreq = getCharacterFrequency();
  const readability = getReadabilityScore();

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1 className="mb-3">{props.heading}</h1>

        {/* Text Input */}
        <div className="mb-3">
          <textarea
            className="form-control display-4"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#042743" : "white",
              color: props.mode === "dark" ? "white" : "black",
              textAlign: textAlignment
            }}
            id="myBox"
            rows="8"
            placeholder="Enter Text Here"
          ></textarea>
        </div>

        {/* Basic Text Operations */}
        <div className="mb-3">
          <h5>Basic Operations</h5>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleUpClick}
          >
            Uppercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleLowClick}
          >
            Lowercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleCapitalize}
          >
            Capitalize
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleTitleCase}
          >
            Title Case
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleAlternatingCase}
          >
            Alternating Case
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleReverseText}
          >
            Reverse Text
          </button>
        </div>

        {/* Text Alignment */}
        <div className="mb-3">
          <h5>Text Alignment</h5>
          <button
            className={`btn ${textAlignment === 'left' ? 'btn-success' : 'btn-outline-success'} mx-1 my-1`}
            onClick={() => setTextAlignment('left')}
          >
            Left
          </button>
          <button
            className={`btn ${textAlignment === 'center' ? 'btn-success' : 'btn-outline-success'} mx-1 my-1`}
            onClick={() => setTextAlignment('center')}
          >
            Center
          </button>
          <button
            className={`btn ${textAlignment === 'right' ? 'btn-success' : 'btn-outline-success'} mx-1 my-1`}
            onClick={() => setTextAlignment('right')}
          >
            Right
          </button>
          <button
            className={`btn ${textAlignment === 'justify' ? 'btn-success' : 'btn-outline-success'} mx-1 my-1`}
            onClick={() => setTextAlignment('justify')}
          >
            Justify
          </button>
        </div>

        {/* Advanced Operations */}
        <div className="mb-3">
          <h5>Advanced Operations</h5>
          <button
            disabled={text.length === 0}
            className="btn btn-warning change mx-1 my-1"
            onClick={handleExtarSpaces}
          >
            Remove Extra Spaces
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-warning change mx-1 my-1"
            onClick={handleCopyText}
          >
            Copy Text
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-warning change mx-1 my-1"
            onClick={handleEncryptText}
          >
            Encrypt (ROT13)
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-warning change mx-1 my-1"
            onClick={handleDecryptText}
          >
            Decrypt (ROT13)
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-warning change mx-1 my-1"
            onClick={handleURLEncode}
          >
            URL Encode
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-warning change mx-1 my-1"
            onClick={handleURLDecode}
          >
            URL Decode
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-warning change mx-1 my-1"
            onClick={handleTextToSpeech}
          >
            Text to Speech
          </button>
        </div>

        {/* Find and Replace */}
        <div className="mb-3">
          <h5>Find and Replace</h5>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Find text..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                style={{
                  backgroundColor: props.mode === "dark" ? "#042743" : "white",
                  color: props.mode === "dark" ? "white" : "black",
                }}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Replace with..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                style={{
                  backgroundColor: props.mode === "dark" ? "#042743" : "white",
                  color: props.mode === "dark" ? "white" : "black",
                }}
              />
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-info"
                onClick={handleFindReplace}
              >
                Find & Replace
              </button>
            </div>
          </div>
        </div>

        {/* Generators */}
        <div className="mb-3">
          <h5>Generators</h5>
          <button
            className="btn btn-secondary mx-1 my-1"
            onClick={handleGenerateLoremIpsum}
          >
            Generate Lorem Ipsum
          </button>
          <button
            className="btn btn-secondary mx-1 my-1"
            onClick={handleGeneratePassword}
          >
            Generate Password
          </button>
          <button
            className="btn btn-danger mx-1 my-1"
            onClick={handleClearClick}
          >
            Clear Text
          </button>
        </div>

        {/* Advanced Analysis Toggle */}
        <div className="mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Analysis
          </button>
        </div>

        {/* Advanced Analysis */}
        {showAdvanced && (
          <div className="mb-3">
            <h5>Advanced Text Analysis</h5>

            {/* Word Frequency */}
            <div className="row mb-3">
              <div className="col-md-6">
                <h6>Top 10 Most Frequent Words:</h6>
                <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {wordFreq.map(([word, count], index) => (
                    <div key={index} className="d-flex justify-content-between">
                      <span>{word}:</span>
                      <span className="badge bg-primary">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Character Frequency */}
              <div className="col-md-6">
                <h6>Top 10 Most Frequent Characters:</h6>
                <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {charFreq.map(([char, count], index) => (
                    <div key={index} className="d-flex justify-content-between">
                      <span>'{char}':</span>
                      <span className="badge bg-success">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Summary */}
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Text Summary</h2>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Words:</strong> {stats.words}</p>
            <p><strong>Characters:</strong> {stats.characters}</p>
            <p><strong>Characters (no spaces):</strong> {stats.charactersNoSpaces}</p>
            <p><strong>Sentences:</strong> {stats.sentences}</p>
            <p><strong>Paragraphs:</strong> {stats.paragraphs}</p>
            <p><strong>Lines:</strong> {stats.lines}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Reading Time:</strong> {Math.ceil(stats.words / 200)} minutes</p>
            <p><strong>Speaking Time:</strong> {Math.ceil(stats.words / 130)} minutes</p>
            <p><strong>Readability Score:</strong> {readability} (Flesch Reading Ease)</p>
            <p><strong>Readability Level:</strong> {
              readability >= 90 ? "Very Easy" :
                readability >= 80 ? "Easy" :
                  readability >= 70 ? "Fairly Easy" :
                    readability >= 60 ? "Standard" :
                      readability >= 50 ? "Fairly Difficult" :
                        readability >= 30 ? "Difficult" : "Very Difficult"
            }</p>
          </div>
        </div>

        <h3>Preview</h3>
        <div
          className="border rounded p-3"
          style={{
            backgroundColor: props.mode === "dark" ? "#042743" : "white",
            color: props.mode === "dark" ? "white" : "black",
            textAlign: textAlignment
          }}
        >
          {text.length > 0 ? text : "Nothing to Preview"}
        </div>
      </div>
    </>
  );
}
