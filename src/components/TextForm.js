import React, { useState, useEffect, useRef } from "react";
import { FiInfo } from "react-icons/fi";
import AdBanner from './AdBanner';

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [textAlignment, setTextAlignment] = useState("left");
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [activeTextAction, setActiveTextAction] = useState(null);
  const actionSnapshotRef = useRef(null);

  const splitTextIntoWords = (value) =>
    value
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/[^A-Za-z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const toCapitalizedWords = (words) =>
    words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  const applyTextAction = (actionKey, transformFn) => {
    if (activeTextAction === actionKey && actionSnapshotRef.current?.actionKey === actionKey) {
      setText(actionSnapshotRef.current.previousText);
      setActiveTextAction(null);
      actionSnapshotRef.current = null;
      return true;
    }

    actionSnapshotRef.current = {
      actionKey,
      previousText: text
    };

    setText(transformFn(text));
    setActiveTextAction(actionKey);
    return false;
  };

  const handleTextCaseButton = (caseType) => {
    const didUndo = applyTextAction(`case:${caseType}`, (currentText) => {
      const words = splitTextIntoWords(currentText);

      if (words.length === 0) {
        props.showAlert("Please enter some text first", "warning");
        return currentText;
      }

      const lowerWords = words.map(word => word.toLowerCase());

      switch (caseType) {
        case "sentence":
          return lowerWords.length > 0
            ? [lowerWords[0].charAt(0).toUpperCase() + lowerWords[0].slice(1), ...lowerWords.slice(1)].join(" ")
            : currentText;
        case "capitalized":
          return toCapitalizedWords(words).join(" ");
        case "pascal":
          return toCapitalizedWords(words).join("");
        case "camel":
          return lowerWords[0] + toCapitalizedWords(words.slice(1)).join("");
        case "snake":
          return lowerWords.join("_");
        case "constant":
          return words.map(word => word.toUpperCase()).join("_");
        case "kebab":
          return lowerWords.join("-");
        case "dot":
          return lowerWords.join(".");
        case "path":
          return lowerWords.join("/");
        default:
          return currentText;
      }
    });

    props.showAlert(didUndo ? `${caseType} case cleared` : `${caseType} case applied`, "success");
  };

  const handleUppercase = () => {
    const didUndo = applyTextAction("uppercase", (currentText) => currentText.toUpperCase());
    props.showAlert(didUndo ? "Uppercase selection cleared" : "Text converted to UPPERCASE", "success");
  };

  const handleLowercase = () => {
    const didUndo = applyTextAction("lowercase", (currentText) => currentText.toLowerCase());
    props.showAlert(didUndo ? "Lowercase selection cleared" : "Text converted to lowercase", "success");
  };

  const handleCapitalized = () => {
    const didUndo = applyTextAction("capitalized-basic", (currentText) =>
      currentText.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    );
    props.showAlert(didUndo ? "Capitalized Case selection cleared" : "Text converted to Capitalized Case", "success");
  };

  const handleSentenceCase = () => {
    const didUndo = applyTextAction("sentence-basic", (currentText) => {
      const lower = currentText.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    });
    props.showAlert(didUndo ? "Sentence Case selection cleared" : "Text converted to Sentence Case", "success");
  };

  const handleAlternating = () => {
    const didUndo = applyTextAction("alternating", (currentText) => {
      let newText = "";
      for (let i = 0; i < currentText.length; i++) {
        newText += i % 2 === 0 ? currentText[i].toLowerCase() : currentText[i].toUpperCase();
      }
      return newText;
    });
    props.showAlert(didUndo ? "Alternating Case selection cleared" : "Text converted to Alternating Case", "success");
  };

  const handleReverse = () => {
    const didUndo = applyTextAction("reverse", (currentText) => currentText.split('').reverse().join(''));
    props.showAlert(didUndo ? "Reverse selection cleared" : "Text reversed", "success");
  };

  // Load drafts from localStorage on mount
  useEffect(() => {
    const drafts = JSON.parse(localStorage.getItem('textDrafts') || '[]');
    setSavedDrafts(drafts);

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
    }, 2000);

    return () => clearTimeout(timer);
  }, [text]);

  const handleOnChange = (event) => {
    setText(event.target.value);
    setActiveTextAction(null);
    actionSnapshotRef.current = null;
  };

  const handleClearClick = () => {
    setText("");
    setActiveTextAction(null);
    actionSnapshotRef.current = null;
    props.showAlert("Text Cleared", "success");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied to Clipboard", "success");
  };

  const handleExtarSpaces = () => {
    const newText = text.split(/[ ] + /);
    setText(newText.join(" "));
    setActiveTextAction(null);
    actionSnapshotRef.current = null;
    props.showAlert("Extra spaces removed from text", "success");
  };

  const handleFindReplace = () => {
    if (findText && replaceText) {
      const newText = text.replace(new RegExp(findText, 'g'), replaceText);
      setText(newText);
      props.showAlert("Find and Replace completed", "success");
    } else {
      props.showAlert("Please enter both find and replace text", "warning");
    }
  };

  const handleReverseText = () => {
    handleReverse();
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

  const summaryCardStyle = {
    background: props.mode === "dark"
      ? "linear-gradient(135deg, #1a2332 0%, #243447 100%)"
      : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    color: "#ffffff",
    border: `1px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.22)" : "rgba(79, 70, 229, 0.22)"}`,
    boxShadow: props.mode === "dark"
      ? "0 10px 24px rgba(15, 23, 42, 0.28)"
      : "0 10px 24px rgba(79, 70, 229, 0.14)"
  };

  const summaryValueStyle = {
    color: "#ffffff"
  };

  const summaryLabelStyle = {
    color: props.mode === "dark" ? "rgba(255,255,255,0.84)" : "rgba(255,255,255,0.9)"
  };

  const textCaseTools = [
    {
      label: "Sentence case",
      caseType: "sentence",
      description: "Capitalizes the first word and keeps the rest lowercase.",
      example: "Hello world from textutils"
    },
    {
      label: "Capitalized Case",
      caseType: "capitalized",
      description: "Capitalizes the first letter of every word.",
      example: "Hello World From Textutils"
    },
    {
      label: "PascalCase",
      caseType: "pascal",
      description: "Removes separators and capitalizes every word.",
      example: "HelloWorldFromTextutils"
    },
    {
      label: "camelCase",
      caseType: "camel",
      description: "Lowercases the first word and capitalizes the rest.",
      example: "helloWorldFromTextutils"
    },
    {
      label: "snake_case",
      caseType: "snake",
      description: "Joins lowercase words with underscores.",
      example: "hello_world_from_textutils"
    },
    {
      label: "CONSTANT_CASE",
      caseType: "constant",
      description: "Joins uppercase words with underscores.",
      example: "HELLO_WORLD_FROM_TEXTUTILS"
    },
    {
      label: "kebab-case",
      caseType: "kebab",
      description: "Joins lowercase words with hyphens.",
      example: "hello-world-from-textutils"
    },
    {
      label: "dot.case",
      caseType: "dot",
      description: "Joins lowercase words with dots.",
      example: "hello.world.from.textutils"
    },
    {
      label: "path/case",
      caseType: "path",
      description: "Joins lowercase words with slashes.",
      example: "hello/world/from/textutils"
    },
  ];

  const advancedActionButtons = [
    {
      label: "Remove Extra Spaces",
      title: "Removes repeated spaces and keeps a single space between words.",
      onClick: handleExtarSpaces
    },
    {
      label: "Copy Text",
      title: "Copies the current text to your clipboard.",
      onClick: handleCopyText
    },
    {
      label: "Encrypt (ROT13)",
      title: "Applies ROT13, a simple letter substitution cipher.",
      onClick: handleEncryptText
    },
    {
      label: "Decrypt (ROT13)",
      title: "ROT13 is symmetric, so this reverses the encryption.",
      onClick: handleDecryptText
    },
    {
      label: "URL Encode",
      title: "Converts the text into a URL-safe format.",
      onClick: handleURLEncode
    },
    {
      label: "URL Decode",
      title: "Restores URL-encoded text back to normal text.",
      onClick: handleURLDecode
    },
    {
      label: "Text to Speech",
      title: "Reads the current text aloud using your browser.",
      onClick: handleTextToSpeech
    },
  ];

  const adClient = props.adClient || '';
  const adSlot = props.adSlot || '';

  const HelpableButton = ({
    label,
    helpText,
    onClick,
    disabled = false,
    buttonClassName = "btn-primary",
    compact = false,
  }) => {
    return (
      <div className={`help-button-shell ${compact ? "help-button-shell--compact" : "help-button-shell--block"}`}>
        <button
          type="button"
          disabled={disabled}
          className={`btn ${buttonClassName} help-button-shell__action`}
          onClick={onClick}
        >
          {label}
        </button>
        <button
          type="button"
          className="help-button-shell__info"
          aria-label={`Help for ${label}`}
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
        >
          <FiInfo aria-hidden="true" />
        </button>
        <div className="help-button-shell__popover" role="status" aria-live="polite">
          <div className="help-button-shell__popover-title">{label}</div>
          <div className="help-button-shell__popover-body">{helpText}</div>
        </div>
      </div>
    );
  };

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

        <AdBanner
          client={adClient}
          slot={adSlot}
          mode={props.mode}
          ariaLabel="Sponsored placement inside the text editor"
          className="mb-4 d-block d-lg-none"
          minHeight="280px"
        />

        {/* Basic Text Operations */}
        <div className="mb-3">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Basic Operations</h5>
          <div className="action-buttons-row">
          <button
            disabled={text.length === 0}
            className={`btn change mx-1 my-1 feature-toggle-button ${activeTextAction === 'uppercase' ? 'is-active' : ''}`}
            onClick={handleUppercase}
          >
            UPPERCASE
          </button>
          <button
            disabled={text.length === 0}
            className={`btn change mx-1 my-1 feature-toggle-button ${activeTextAction === 'lowercase' ? 'is-active' : ''}`}
            onClick={handleLowercase}
          >
            lowercase
          </button>
          <button
            disabled={text.length === 0}
            className={`btn change mx-1 my-1 feature-toggle-button ${activeTextAction === 'capitalized-basic' ? 'is-active' : ''}`}
            onClick={handleCapitalized}
          >
            Capitalized Case
          </button>
          <button
            disabled={text.length === 0}
            className={`btn change mx-1 my-1 feature-toggle-button ${activeTextAction === 'sentence-basic' ? 'is-active' : ''}`}
            onClick={handleSentenceCase}
          >
            Sentence Case
          </button>
          <button
            disabled={text.length === 0}
            className={`btn change mx-1 my-1 feature-toggle-button ${activeTextAction === 'alternating' ? 'is-active' : ''}`}
            onClick={handleAlternating}
          >
            Alternating Case
          </button>
          <button
            disabled={text.length === 0}
            className={`btn change mx-1 my-1 feature-toggle-button ${activeTextAction === 'reverse' ? 'is-active' : ''}`}
            onClick={handleReverseText}
          >
            Reverse Text
          </button>
          </div>
        </div>

        {/* Text Case Conversions */}
        <div className="mb-3 case-control-panel">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Text Case Conversions</h5>
          {/* {activeTextAction && (
            <div className="selected-action-pill mb-3">
              Selected action is active. Click the same button again to undo it.
            </div>
          )} */}
          <div className="row g-2">
            {textCaseTools.map((tool) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={tool.caseType}>
                <HelpableButton
                  label={tool.label}
                  helpText={`${tool.description} Example: ${tool.example}`}
                  disabled={text.length === 0}
                  buttonClassName={`feature-toggle-button feature-toggle-button--outline text-case-button ${activeTextAction === `case:${tool.caseType}` ? 'is-active' : ''}`}
                  onClick={() => handleTextCaseButton(tool.caseType)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text Alignment */}
        <div className="mb-3">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Text Alignment</h5>
          <div className="action-buttons-row">
          <button
            className={`btn ${textAlignment === 'left' ? 'btn-primary' : 'btn-outline-primary'} mx-1 my-1`}
            onClick={() => setTextAlignment('left')}
          >
            Left
          </button>
          <button
            className={`btn ${textAlignment === 'center' ? 'btn-primary' : 'btn-outline-primary'} mx-1 my-1`}
            onClick={() => setTextAlignment('center')}
          >
            Center
          </button>
          <button
            className={`btn ${textAlignment === 'right' ? 'btn-primary' : 'btn-outline-primary'} mx-1 my-1`}
            onClick={() => setTextAlignment('right')}
          >
            Right
          </button>
          <button
            className={`btn ${textAlignment === 'justify' ? 'btn-primary' : 'btn-outline-primary'} mx-1 my-1`}
            onClick={() => setTextAlignment('justify')}
          >
            Justify
          </button>
          </div>
        </div>

        {/* Advanced Operations */}
        <div className="mb-3">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Advanced Operations</h5>
          <div className="action-buttons-row action-buttons-row--wrap">
          {advancedActionButtons.map((button) => (
            <HelpableButton
              key={button.label}
              label={button.label}
              helpText={button.title}
              disabled={text.length === 0}
              buttonClassName="btn-primary change mx-1 my-1"
              compact
              onClick={button.onClick}
            />
          ))}
          </div>
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
          <div className="action-buttons-row">
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
        </div>

        {/* Save/Export Options */}
        <div className="mb-3">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Save & Export</h5>
          <div className="action-buttons-row">
          <button
            disabled={text.length === 0}
            className="btn btn-primary mx-1 my-1"
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
                      <span className="badge bg-primary">{count}</span>
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
          <div className="stat-item" style={summaryCardStyle}>
            <h3 style={summaryValueStyle}>{stats.words}</h3>
            <p style={summaryLabelStyle}>Words</p>
          </div>
          <div className="stat-item" style={summaryCardStyle}>
            <h3 style={summaryValueStyle}>{stats.characters}</h3>
            <p style={summaryLabelStyle}>Characters</p>
          </div>
          <div className="stat-item" style={summaryCardStyle}>
            <h3 style={summaryValueStyle}>{stats.sentences}</h3>
            <p style={summaryLabelStyle}>Sentences</p>
          </div>
          <div className="stat-item" style={summaryCardStyle}>
            <h3 style={summaryValueStyle}>{stats.paragraphs}</h3>
            <p style={summaryLabelStyle}>Paragraphs</p>
          </div>
          <div className="stat-item" style={summaryCardStyle}>
            <h3 style={summaryValueStyle}>{Math.ceil(stats.words / 200)} min</h3>
            <p style={summaryLabelStyle}>Reading Time</p>
          </div>
          <div className="stat-item" style={summaryCardStyle}>
            <h3 style={summaryValueStyle}>{Math.ceil(stats.words / 130)} min</h3>
            <p style={summaryLabelStyle}>Speaking Time</p>
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
            transition: "all 0.3s ease",
            overflowWrap: "break-word"
          }}
        >
          {text.length > 0 ? text : "Nothing to Preview"}
        </div>
      </div>
    </>
  );
}
