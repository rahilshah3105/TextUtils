import React, { useState } from "react";

export default function UtilityTools(props) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedTool, setSelectedTool] = useState("json");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(inputText);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputText(formatted);
      props.showAlert("JSON formatted successfully", "success");
    } catch (error) {
      setOutputText("Invalid JSON: " + error.message);
      props.showAlert("Invalid JSON format", "danger");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(inputText);
      const minified = JSON.stringify(parsed);
      setOutputText(minified);
      props.showAlert("JSON minified successfully", "success");
    } catch (error) {
      setOutputText("Invalid JSON: " + error.message);
      props.showAlert("Invalid JSON format", "danger");
    }
  };

  const encodeBase64 = () => {
    try {
      const encoded = btoa(inputText);
      setOutputText(encoded);
      props.showAlert("Text encoded to Base64", "success");
    } catch (error) {
      setOutputText("Error encoding: " + error.message);
      props.showAlert("Error encoding text", "danger");
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(inputText);
      setOutputText(decoded);
      props.showAlert("Base64 decoded successfully", "success");
    } catch (error) {
      setOutputText("Error decoding: " + error.message);
      props.showAlert("Error decoding Base64", "danger");
    }
  };

  const convertToHex = () => {
    const hex = Array.from(inputText).map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    setOutputText(hex);
    props.showAlert("Text converted to hexadecimal", "success");
  };

  const convertFromHex = () => {
    try {
      const text = inputText.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
      setOutputText(text);
      props.showAlert("Hexadecimal converted to text", "success");
    } catch (error) {
      setOutputText("Error converting from hex: " + error.message);
      props.showAlert("Error converting from hexadecimal", "danger");
    }
  };

  const convertToBinary = () => {
    const binary = Array.from(inputText).map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    setOutputText(binary);
    props.showAlert("Text converted to binary", "success");
  };

  const convertFromBinary = () => {
    try {
      const text = inputText.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      setOutputText(text);
      props.showAlert("Binary converted to text", "success");
    } catch (error) {
      setOutputText("Error converting from binary: " + error.message);
      props.showAlert("Error converting from binary", "danger");
    }
  };

  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
    setOutputText(uuid);
    props.showAlert("UUID generated", "success");
  };

  const generateHash = () => {
    let hash = 0;
    if (inputText.length === 0) return;
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    setOutputText(hash.toString());
    props.showAlert("Hash generated", "success");
  };

  const escapeHTML = () => {
    const escaped = inputText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    setOutputText(escaped);
    props.showAlert("HTML escaped", "success");
  };

  const unescapeHTML = () => {
    const unescaped = inputText
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    setOutputText(unescaped);
    props.showAlert("HTML unescaped", "success");
  };

  const clearTexts = () => {
    setInputText("");
    setOutputText("");
    props.showAlert("Texts cleared", "success");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
    props.showAlert("Output copied to clipboard", "success");
  };

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
    setInputText("");
    setOutputText("");
  };

  const executeTool = () => {
    switch (selectedTool) {
      case "json":
        formatJSON();
        break;
      case "jsonMinify":
        minifyJSON();
        break;
      case "base64Encode":
        encodeBase64();
        break;
      case "base64Decode":
        decodeBase64();
        break;
      case "hexEncode":
        convertToHex();
        break;
      case "hexDecode":
        convertFromHex();
        break;
      case "binaryEncode":
        convertToBinary();
        break;
      case "binaryDecode":
        convertFromBinary();
        break;
      case "uuid":
        generateUUID();
        break;
      case "hash":
        generateHash();
        break;
      case "htmlEscape":
        escapeHTML();
        break;
      case "htmlUnescape":
        unescapeHTML();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="container my-4"
      style={{ color: props.mode === "dark" ? "#c9d1d9" : "#1f2328" }}
    >
      <h2 className="mb-3" style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>Utility Tools</h2>
      
      {/* Tool Selection */}
      <div className="mb-3">
        <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Select Tool:</h5>
        <div className="row">
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "json" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("json")}
            >
              Format JSON
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "jsonMinify" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("jsonMinify")}
            >
              Minify JSON
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "base64Encode" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("base64Encode")}
            >
              Base64 Encode
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "base64Decode" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("base64Decode")}
            >
              Base64 Decode
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "hexEncode" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("hexEncode")}
            >
              Hex Encode
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "hexDecode" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("hexDecode")}
            >
              Hex Decode
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "binaryEncode" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("binaryEncode")}
            >
              Binary Encode
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "binaryDecode" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("binaryDecode")}
            >
              Binary Decode
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "uuid" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("uuid")}
            >
              Generate UUID
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "hash" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("hash")}
            >
              Generate Hash
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "htmlEscape" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("htmlEscape")}
            >
              HTML Escape
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className={`btn ${selectedTool === "htmlUnescape" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => handleToolChange("htmlUnescape")}
            >
              HTML Unescape
            </button>
          </div>
        </div>
      </div>

      {/* Input/Output Section */}
      <div className="row">
        <div className="col-md-6">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Input</h5>
          <textarea
            className="form-control"
            value={inputText}
            onChange={handleInputChange}
            style={{
              backgroundColor: props.mode === "dark" ? "transparent" : "rgba(255, 255, 255, 0.9)",
              color: props.mode === "dark" ? "#ffffff" : "#212529",
              border: `2px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.35)" : "rgba(0, 0, 0, 0.1)"}`,
              transition: "all 0.3s ease",
              fontWeight: "400"
            }}
            rows="10"
            placeholder={
              selectedTool === "json" || selectedTool === "jsonMinify" ? "Enter JSON here..." :
              selectedTool === "uuid" ? "Click Generate UUID button" :
              selectedTool === "hash" ? "Enter text to hash..." :
              "Enter text here..."
            }
            disabled={selectedTool === "uuid"}
          ></textarea>
        </div>
        
        <div className="col-md-6">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Output</h5>
          <textarea
            className="form-control"
            value={outputText}
            readOnly
            style={{
              backgroundColor: props.mode === "dark" ? "transparent" : "rgba(255, 255, 255, 0.9)",
              color: props.mode === "dark" ? "#ffffff" : "#212529",
              border: `2px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.35)" : "rgba(0, 0, 0, 0.1)"}`,
              transition: "all 0.3s ease",
              fontWeight: "400"
            }}
            rows="10"
            placeholder="Output will appear here..."
          ></textarea>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-3">
        <button
          className="btn btn-primary mx-2"
          onClick={executeTool}
          disabled={selectedTool !== "uuid" && !inputText}
        >
          {selectedTool === "uuid" ? "Generate UUID" : "Execute"}
        </button>
        <button
          className="btn btn-info mx-2"
          onClick={copyOutput}
          disabled={!outputText}
        >
          Copy Output
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={clearTexts}
        >
          Clear All
        </button>
      </div>
    </div>
  );
} 