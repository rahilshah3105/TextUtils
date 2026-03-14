// import logo from './logo.svg';
import './App.css';
import './ModernUI.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import TextComparison from './components/TextComparison';
import UtilityTools from './components/UtilityTools';

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
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showAlert('Document auto-saved!', 'success');
      }
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
    setAlert({ msg: message, type: type });
    setTimeout(() => { setAlert(null); }, 2000);
  };

  const toggleMode = (cls) => {
    document.body.classList.remove('bg-light', 'bg-dark');
    const newMode = cls === 'light' ? 'light' : 'dark';
    setMode(newMode);
    document.body.classList.add('bg-' + newMode);
    showAlert("Mode has been changed...", "success");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'textForm':
        return <TextForm showAlert={showAlert} heading="Try Worded — Advanced Text Analysis & Formatting Tools" mode={mode} />;
      case 'textComparison':
        return <TextComparison showAlert={showAlert} mode={mode} />;
      case 'utilityTools':
        return <UtilityTools showAlert={showAlert} mode={mode} />;
      default:
        return <TextForm showAlert={showAlert} heading="Try Worded — Advanced Text Analysis & Formatting Tools" mode={mode} />;
    }
  };

  const tabAccent = '#6366f1';

  return (
    <>
      <Navbar title="Worded" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">

        {/* Tab Navigation */}
        <div className="mb-4">
          <ul className="nav nav-tabs" style={{ borderBottom: `2px solid ${mode === 'dark' ? '#2d3748' : '#e2e5fc'}` }}>
            {[
              { key: 'textForm', label: 'Text Editor' },
              { key: 'textComparison', label: 'Text Comparison' },
              { key: 'utilityTools', label: 'Utility Tools' },
            ].map(tab => (
              <li className="nav-item" key={tab.key}>
                <button
                  className="nav-link border-0"
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    color: activeTab === tab.key ? tabAccent : (mode === 'dark' ? '#8b949e' : '#6b7280'),
                    fontWeight: activeTab === tab.key ? '600' : '400',
                    borderBottom: activeTab === tab.key ? `2px solid ${tabAccent}` : '2px solid transparent',
                    background: 'transparent',
                    borderRadius: 0,
                    padding: '10px 18px',
                    transition: 'all 0.2s ease',
                    marginBottom: '-2px'
                  }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {renderActiveTab()}
        </div>

      </div>
    </>
  );
}

export default App;
