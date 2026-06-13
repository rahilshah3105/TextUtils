import React, { useState, useEffect, useCallback } from "react";
import AdBanner from './AdBanner';

export default function TextComparison(props) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);

  const handleText1Change = (event) => {
    setText1(event.target.value);
  };

  const handleText2Change = (event) => {
    setText2(event.target.value);
  };

  const compareTexts = useCallback(() => {
    if (!text1 || !text2) {
      setComparisonResult(null);
      return;
    }

    const words1 = text1.toLowerCase().match(/\b\w+\b/g) || [];
    const words2 = text2.toLowerCase().match(/\b\w+\b/g) || [];
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const commonWords = [...set1].filter(word => set2.has(word));
    const uniqueToText1 = [...set1].filter(word => !set2.has(word));
    const uniqueToText2 = [...set2].filter(word => !set1.has(word));
    
    const similarity = commonWords.length / Math.max(set1.size, set2.size) * 100;
    
    setComparisonResult({
      commonWords,
      uniqueToText1,
      uniqueToText2,
      similarity: Math.round(similarity),
      wordCount1: words1.length,
      wordCount2: words2.length,
      charCount1: text1.length,
      charCount2: text2.length
    });
  }, [text1, text2]);

  // Automatically compare texts whenever text1 or text2 changes
  useEffect(() => {
    compareTexts();
  }, [compareTexts]);

  const clearTexts = () => {
    setText1("");
    setText2("");
    setComparisonResult(null);
    props.showAlert("Texts cleared", "success");
  };

  const adClient = props.adClient || '';
  const adSlot = props.adSlot || '';

  return (
    <div
      className="container my-4"
      style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}
    >
      <h2 className="mb-3" style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>Text Comparison Tool</h2>
      
      <div className="row">
        <div className="col-md-6">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Text 1</h5>
          <textarea
            className="form-control"
            value={text1}
            onChange={handleText1Change}
            style={{
              backgroundColor: props.mode === "dark" ? "transparent" : "rgba(255, 255, 255, 0.9)",
              color: props.mode === "dark" ? "#ffffff" : "#212529",
              border: `2px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.35)" : "rgba(0, 0, 0, 0.1)"}`,
              transition: "all 0.3s ease",
              fontSize: "16px",
              lineHeight: "1.6",
              fontWeight: "400"
            }}
            rows="8"
            placeholder="Enter first text here..."
          ></textarea>
        </div>
        
        <div className="col-md-6">
          <h5 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Text 2</h5>
          <textarea
            className="form-control"
            value={text2}
            onChange={handleText2Change}
            style={{
              backgroundColor: props.mode === "dark" ? "transparent" : "rgba(255, 255, 255, 0.9)",
              color: props.mode === "dark" ? "#ffffff" : "#212529",
              border: `2px solid ${props.mode === "dark" ? "rgba(99, 102, 241, 0.35)" : "rgba(0, 0, 0, 0.1)"}`,
              transition: "all 0.3s ease",
              fontSize: "16px",
              lineHeight: "1.6",
              fontWeight: "400"
            }}
            rows="8"
            placeholder="Enter second text here..."
          ></textarea>
        </div>
      </div>
      
      <div className="mt-3">
        <button
          className="btn btn-primary mx-2"
          onClick={compareTexts}
          disabled={!text1 || !text2}
        >
          Compare Texts
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={clearTexts}
        >
          Clear All
        </button>
        <div className="d-inline-block ms-3">
          <span className="badge bg-info me-2">
            ⚡ Live Mode
          </span>
          <small style={{ 
            color: props.mode === "dark" ? "#c9d1d9" : "#6c757d",
            fontWeight: "500"
          }}>
            Results update automatically as you type
          </small>
        </div>
      </div>

        <AdBanner
          client={adClient}
          slot={adSlot}
          mode={props.mode}
          ariaLabel="Sponsored placement inside the comparison tool"
          className="my-4 d-block d-lg-none"
          minHeight="280px"
        />
      
      {comparisonResult && (
        <div className="mt-4">
          <h3 style={{ color: props.mode === "dark" ? "#ffffff" : "#1f2328" }}>Comparison Results</h3>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card" style={{ 
                backgroundColor: props.mode === "dark" ? "#1a2332" : "white",
                border: `1px solid ${props.mode === "dark" ? "#243447" : "rgba(0, 0, 0, 0.06)"}`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
              }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: props.mode === "dark" ? "#539bf5" : "#0969da" }}>Text 1 Statistics</h5>
                  <p style={{ color: props.mode === "dark" ? "#ffffff" : "#212529" }}><strong>Words:</strong> {comparisonResult.wordCount1}</p>
                  <p style={{ color: props.mode === "dark" ? "#ffffff" : "#212529" }}><strong>Characters:</strong> {comparisonResult.charCount1}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card" style={{ 
                backgroundColor: props.mode === "dark" ? "#1a2332" : "white",
                border: `1px solid ${props.mode === "dark" ? "#243447" : "rgba(0, 0, 0, 0.06)"}`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
              }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: props.mode === "dark" ? "#539bf5" : "#0969da" }}>Text 2 Statistics</h5>
                  <p style={{ color: props.mode === "dark" ? "#ffffff" : "#212529" }}><strong>Words:</strong> {comparisonResult.wordCount2}</p>
                  <p style={{ color: props.mode === "dark" ? "#ffffff" : "#212529" }}><strong>Characters:</strong> {comparisonResult.charCount2}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="card" style={{ 
              backgroundColor: props.mode === "dark" ? "#1a2332" : "white",
              border: `1px solid ${props.mode === "dark" ? "#243447" : "rgba(0, 0, 0, 0.06)"}`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: props.mode === "dark" ? "#539bf5" : "#0969da" }}>Similarity Analysis</h5>
                <div className="progress mb-3">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${comparisonResult.similarity}%` }}
                    aria-valuenow={comparisonResult.similarity} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {comparisonResult.similarity}% Similar
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-4">
                    <h6 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Common Words ({comparisonResult.commonWords.length})</h6>
                    <div style={{ 
                      maxHeight: '150px', 
                      overflowY: 'auto',
                      backgroundColor: props.mode === "dark" ? "#243447" : "#f8f9fa",
                      padding: '10px',
                      borderRadius: '8px'
                    }}>
                      {comparisonResult.commonWords.map((word, index) => (
                        <span key={index} className="badge bg-primary me-1 mb-1">{word}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <h6 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Unique to Text 1 ({comparisonResult.uniqueToText1.length})</h6>
                    <div style={{ 
                      maxHeight: '150px', 
                      overflowY: 'auto',
                      backgroundColor: props.mode === "dark" ? "#243447" : "#f8f9fa",
                      padding: '10px',
                      borderRadius: '8px'
                    }}>
                      {comparisonResult.uniqueToText1.map((word, index) => (
                        <span key={index} className="badge bg-primary me-1 mb-1">{word}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <h6 style={{ color: props.mode === "dark" ? "#c9d1d9" : "#24292f" }}>Unique to Text 2 ({comparisonResult.uniqueToText2.length})</h6>
                    <div style={{ 
                      maxHeight: '150px', 
                      overflowY: 'auto',
                      backgroundColor: props.mode === "dark" ? "#243447" : "#f8f9fa",
                      padding: '10px',
                      borderRadius: '8px'
                    }}>
                      {comparisonResult.uniqueToText2.map((word, index) => (
                        <span key={index} className="badge bg-primary me-1 mb-1">{word}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 