// import logo from './logo.svg';
import './App.css';
import './ModernUI.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import TextComparison from './components/TextComparison';
import UtilityTools from './components/UtilityTools';
// import Navbar_Without_props from './components/Navbar_Without_props';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

function App() {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
  const [alert, setAlert] = useState(null);
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'textForm');

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('mode', mode);
    localStorage.setItem('activeTab', activeTab);
  }, [mode, activeTab]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showAlert('Document auto-saved!', 'success');
      }
      // Ctrl/Cmd + 1, 2, 3 to switch tabs
      if ((e.ctrlKey || e.metaKey) && ['1', '2', '3'].includes(e.key)) {
        e.preventDefault();
        const tabs = ['textForm', 'textComparison', 'utilityTools'];
        setActiveTab(tabs[parseInt(e.key) - 1]);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const removeBodyClasses = () => {
    document.body.classList.remove('bg-light', 'bg-dark', 'bg-danger', 'bg-success', 'bg-warning', 'bg-secondary', 'bg-info');
    // document.body.classList.remove('bg-dark');
    // document.body.classList.remove('bg-danger');
    // document.body.classList.remove('bg-success');
    // document.body.classList.remove('bg-warning');
    // document.body.classList.remove('bg-secondary');
    // document.body.classList.remove('bg-info');
    // document.body.classList.remove('bg-light', 'bg-dark');
    // const textArea = document.querySelector('textarea');
    // if (textArea) {
    //   textArea.classList.remove('bg-light', 'bg-dark', 'bg-danger', 'bg-success', 'bg-warning', 'bg-secondary', 'bg-info');
    // }
    // const about = document.querySelector('.about');
    // if (about) {
    //   about.classList.remove('bg-light', 'bg-dark', 'bg-danger', 'bg-success', 'bg-warning', 'bg-secondary', 'bg-info');
    // }
  };

  const toggleMode = (cls) => {
    removeBodyClasses();

    // Toggle mode state - simplified to light or dark
    setMode(cls === 'light' ? 'light' : 'dark');

    // Add the new background class to the body
    document.body.classList.add('bg-' + cls);

    // Show an alert indicating mode change
    showAlert("Mode has been changed...", "success");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'textForm':
        return <TextForm showAlert={showAlert} heading="Try Worded - Advanced Text Analysis & Formatting Tools" mode={mode} />;
      case 'textComparison':
        return <TextComparison showAlert={showAlert} mode={mode} />;
      case 'utilityTools':
        return <UtilityTools showAlert={showAlert} mode={mode} />;
      default:
        return <TextForm showAlert={showAlert} heading="Try Worded - Advanced Text Analysis & Formatting Tools" mode={mode} />;
    }
  };

  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About TextUtils" /> */}
      {/* <Router> */}
      <Navbar title="Worded" mode={mode} toggleMode={toggleMode} />
      {/* <Navbar_Without_props title="Worded" mode={mode} toggleMode={toggleMode} /> */}
      <Alert alert={alert} />
      <div className="container my-3">
        {/* <Switch> */}
        {/* <Route excat path='/about'> */}
        {/* <About /> */}
        {/* </Route> */}

        {/* <Route excat path='/'> */}

        {/* Tab Navigation */}
        <div className="mb-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'textForm' ? 'active' : ''}`}
                onClick={() => setActiveTab('textForm')}
                style={{
                  color: mode === "dark" ? "white" : "black",
                  backgroundColor: activeTab === 'textForm' ? (mode === "dark" ? "#042743" : "white") : "transparent"
                }}
              >
                Text Editor
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'textComparison' ? 'active' : ''}`}
                onClick={() => setActiveTab('textComparison')}
                style={{
                  color: mode === "dark" ? "white" : "black",
                  backgroundColor: activeTab === 'textComparison' ? (mode === "dark" ? "#042743" : "white") : "transparent"
                }}
              >
                Text Comparison
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'utilityTools' ? 'active' : ''}`}
                onClick={() => setActiveTab('utilityTools')}
                style={{
                  color: mode === "dark" ? "white" : "black",
                  backgroundColor: activeTab === 'utilityTools' ? (mode === "dark" ? "#042743" : "white") : "transparent"
                }}
              >
                Utility Tools
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="tab-content" id="myTabContent">
          {renderActiveTab()}
        </div>

        {/* </Route> */}
        {/* </Switch> */}
      </div>
    </>
  );
}

export default App;
