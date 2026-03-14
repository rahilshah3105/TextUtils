import React, { useState, useEffect } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [textAlignment, setTextAlignment] = useState("left");
  const [savedDrafts, setSavedDrafts] = useState([]);

  // Load drafts from localStorage on mount
  useEffect(() => {
    const drafts = JSON.parse(localStorage.getItem('textDrafts') || '[]');
    setSavedDrafts(drafts);
    
    // Load last saved text if exists
    const lastText = localStorage.getItem('lastText');
    if (lastText) {
      setText(lastText);
    }
  }, []);

  // Auto-save text to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text) {
        localStorage.setItem('lastText', text);
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [text]);

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

  // Save/Load/Export functions
  const handleSaveDraft = () => {
    if (!text.trim()) {
      props.showAlert("Cannot save empty text", "warning");
      return;
    }
    
    const draft = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toLocaleString(),
      preview: text.substring(0, 50) + (text.length > 50 ? '...' : '')
    };
    
    const drafts = [...savedDrafts, draft];
    setSavedDrafts(drafts);
    localStorage.setItem('textDrafts', JSON.stringify(drafts));
    props.showAlert("Draft saved successfully", "success");
  };

  const handleLoadDraft = (draft) => {
    setText(draft.text);
    props.showAlert("Draft loaded", "success");
  };

  const handleDeleteDraft = (id) => {
    const drafts = savedDrafts.filter(d => d.id !== id);
    setSavedDrafts(drafts);
    localStorage.setItem('textDrafts', JSON.stringify(drafts));
    props.showAlert("Draft deleted", "success");
  };

  const handleExportTXT = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `textutils_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    props.showAlert("Exported as TXT", "success");
  };

  const handleExportHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Exported Text</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        .content { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="content">
        <pre>${text}</pre>
    </div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `textutils_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    props.showAlert("Exported as HTML", "success");
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>body{font-family: Arial; padding: 20px; line-height: 1.6;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<pre>' + text + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    props.showAlert("Print dialog opened", "success");
  };

  const handleEmailText = () => {
    const subject = encodeURIComponent("Shared Text from Worded");
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    props.showAlert("Email client opened", "success");
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
        style={{ color: props.mode === "dark" ? "#c9d1d9" : "#1f2328" }}
      >
        <h1 className="mb-3" style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>{props.heading}</h1>

        {/* Text Input */}
        <div className="mb-3">
          <textarea
            className="form-control display-4"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "transparent" : "rgba(255, 255, 255, 0.9)",
              color: props.mode === "dark" ? "#ffffff" : "#212529",
              border: `2px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.35)" : "rgba(0, 0, 0, 0.1)"}`,

              textAlign: textAlignment,
              transition: "all 0.3s ease",
              fontWeight: "400"
            }}
            id="myBox"
            rows="8"
            placeholder="Enter Text Here"
          ></textarea>
        </div>

        {/* Basic Text Operations */}
        <div className="mb-3">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Basic Operations</h5>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleUpClick}
          >
            UPPERCASE
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleLowClick}
          >
            lowercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-primary change mx-1 my-1"
            onClick={handleCapitalize}
          >
            Capitalize Each Word
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
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Text Alignment</h5>
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
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Advanced Operations</h5>
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
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Find and Replace</h5>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Find text..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                style={{
                  backgroundColor: props.mode === "dark" ? "transparent" : "rgba(255, 255, 255, 0.9)",
                  color: props.mode === "dark" ? "#ffffff" : "#212529",
                  border: `2px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.35)" : "rgba(0, 0, 0, 0.1)"}`,
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
                  backgroundColor: props.mode === "dark" ? "transparent" : "rgba(255, 255, 255, 0.9)",
                  color: props.mode === "dark" ? "#ffffff" : "#212529",
                  border: `2px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.35)" : "rgba(0, 0, 0, 0.1)"}`,
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
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Generators</h5>
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

        {/* Save/Export Options */}
        <div className="mb-3">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Save & Export</h5>
          <button
            disabled={text.length === 0}
            className="btn btn-success mx-1 my-1"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-info mx-1 my-1"
            onClick={handleExportTXT}
          >
            Export TXT
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-info mx-1 my-1"
            onClick={handleExportHTML}
          >
            Export HTML
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-info mx-1 my-1"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-info mx-1 my-1"
            onClick={handleEmailText}
          >
            Email
          </button>
        </div>

        {/* Saved Drafts */}
        {savedDrafts.length > 0 && (
          <div className="mb-3">
            <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Saved Drafts ({savedDrafts.length})</h5>
            <div className="row">
              {savedDrafts.slice(-5).reverse().map((draft) => (
                <div key={draft.id} className="col-md-6 mb-2">
                  <div className="card">
                    <div className="card-body" style={{
                      backgroundColor: props.mode === "dark" ? "#1a2332" : "white",
                      color: props.mode === "dark" ? "#e6edf3" : "#212529",
                      border: `1px solid ${props.mode === "dark" ? "#243447" : "rgba(0, 0, 0, 0.06)"}`,
                    }}>
                      <p className="card-text small mb-2">{draft.preview}</p>
                      <small className="text-muted d-block mb-2">{draft.timestamp}</small>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleLoadDraft(draft)}
                      >
                        Load
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteDraft(draft.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
            <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Advanced Text Analysis</h5>

            {/* Word Frequency */}
            <div className="row mb-3">
              <div className="col-md-6">
                <h6 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Top 10 Most Frequent Words:</h6>
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
                <h6 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Top 10 Most Frequent Characters:</h6>
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
        style={{ color: props.mode === "dark" ? "#c9d1d9" : "#1f2328" }}
      >
        <h2 className="mb-3" style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>Text Summary</h2>
        
        {/* Statistics Dashboard */}
        <div className="stats-dashboard">
          <div className="stat-item">
            <h3 style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>{stats.words}</h3>
            <p>Words</p>
          </div>
          <div className="stat-item">
            <h3 style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>{stats.characters}</h3>
            <p>Characters</p>
          </div>
          <div className="stat-item">
            <h3 style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>{stats.sentences}</h3>
            <p>Sentences</p>
          </div>
          <div className="stat-item">
            <h3 style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>{stats.paragraphs}</h3>
            <p>Paragraphs</p>
          </div>
          <div className="stat-item">
            <h3 style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>{Math.ceil(stats.words / 200)} min</h3>
            <p>Reading Time</p>
          </div>
          <div className="stat-item">
            <h3 style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>{Math.ceil(stats.words / 130)} min</h3>
            <p>Speaking Time</p>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body" style={{
                backgroundColor: props.mode === "dark" ? "#1a2332" : "white",
                color: props.mode === "dark" ? "#e6edf3" : "#212529"
              }}>
                <h6 style={{ color: props.mode === "dark" ? "#539bf5" : "#0969da" }}>Readability Analysis</h6>
                <p className="mb-1"><strong>Score:</strong> {readability} (Flesch Reading Ease)</p>
                <p className="mb-0"><strong>Level:</strong> {
                  readability >= 90 ? "Very Easy" :
                    readability >= 80 ? "Easy" :
                      readability >= 70 ? "Fairly Easy" :
                        readability >= 60 ? "Standard" :
                          readability >= 50 ? "Fairly Difficult" :
                            readability >= 30 ? "Difficult" : "Very Difficult"
                }</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body" style={{
                backgroundColor: props.mode === "dark" ? "#1a2332" : "white",
                color: props.mode === "dark" ? "#e6edf3" : "#212529"
              }}>
                <h6 style={{ color: props.mode === "dark" ? "#539bf5" : "#0969da" }}>Detailed Metrics</h6>
                <p className="mb-1"><strong>Characters (no spaces):</strong> {stats.charactersNoSpaces}</p>
                <p className="mb-1"><strong>Lines:</strong> {stats.lines}</p>
                <p className="mb-0"><strong>Average Word Length:</strong> {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(2) : 0} chars</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mt-4 mb-3" style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>Preview</h3>
        <div
          className="border rounded p-3"
          style={{
            backgroundColor: props.mode === "dark" ? "#1a2332" : "#f8f9fa",
            color: props.mode === "dark" ? "#e6edf3" : "#212529",
            border: `2px solid ${props.mode === "dark" ? "#243447" : "rgba(0, 0, 0, 0.08)"}`,
            textAlign: textAlignment,
            minHeight: "100px",
            transition: "all 0.3s ease"
          }}
        >
          {text.length > 0 ? text : "Nothing to Preview"}
        </div>
      </div>
    </>
  );
}
