import React, { useState } from "react";

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

  const compareTexts = () => {
    if (!text1 || !text2) {
      props.showAlert("Please enter both texts to compare", "warning");
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
    
    props.showAlert("Text comparison completed", "success");
  };

  const clearTexts = () => {
    setText1("");
    setText2("");
    setComparisonResult(null);
    props.showAlert("Texts cleared", "success");
  };

  return (
    <div
      className="container my-4"
      style={{ color: props.mode === "dark" ? "white" : "black" }}
    >
      <h2 className="mb-3">Text Comparison Tool</h2>
      
      <div className="row">
        <div className="col-md-6">
          <h5>Text 1</h5>
          <textarea
            className="form-control"
            value={text1}
            onChange={handleText1Change}
            style={{
              backgroundColor: props.mode === "dark" ? "#042743" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            rows="8"
            placeholder="Enter first text here..."
          ></textarea>
        </div>
        
        <div className="col-md-6">
          <h5>Text 2</h5>
          <textarea
            className="form-control"
            value={text2}
            onChange={handleText2Change}
            style={{
              backgroundColor: props.mode === "dark" ? "#042743" : "white",
              color: props.mode === "dark" ? "white" : "black",
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
      </div>
      
      {comparisonResult && (
        <div className="mt-4">
          <h3>Comparison Results</h3>
          
          <div className="row">
            <div className="col-md-6">
              <div className="card" style={{ backgroundColor: props.mode === "dark" ? "#042743" : "white" }}>
                <div className="card-body">
                  <h5 className="card-title">Text 1 Statistics</h5>
                  <p><strong>Words:</strong> {comparisonResult.wordCount1}</p>
                  <p><strong>Characters:</strong> {comparisonResult.charCount1}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card" style={{ backgroundColor: props.mode === "dark" ? "#042743" : "white" }}>
                <div className="card-body">
                  <h5 className="card-title">Text 2 Statistics</h5>
                  <p><strong>Words:</strong> {comparisonResult.wordCount2}</p>
                  <p><strong>Characters:</strong> {comparisonResult.charCount2}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="card" style={{ backgroundColor: props.mode === "dark" ? "#042743" : "white" }}>
              <div className="card-body">
                <h5 className="card-title">Similarity Analysis</h5>
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
                    <h6>Common Words ({comparisonResult.commonWords.length})</h6>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {comparisonResult.commonWords.map((word, index) => (
                        <span key={index} className="badge bg-success me-1 mb-1">{word}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <h6>Unique to Text 1 ({comparisonResult.uniqueToText1.length})</h6>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {comparisonResult.uniqueToText1.map((word, index) => (
                        <span key={index} className="badge bg-primary me-1 mb-1">{word}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <h6>Unique to Text 2 ({comparisonResult.uniqueToText2.length})</h6>
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {comparisonResult.uniqueToText2.map((word, index) => (
                        <span key={index} className="badge bg-warning me-1 mb-1">{word}</span>
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