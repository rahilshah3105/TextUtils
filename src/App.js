// import logo from './logo.svg';
import './App.css';
import './ModernUI.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import TextComparison from './components/TextComparison';
import UtilityTools from './components/UtilityTools';
import CookieConsentBanner from './components/CookieConsentBanner';
import AdBanner from './components/AdBanner';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import AppsList from './components/AppsList';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
  const [alert, setAlert] = useState(null);
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'textForm');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('mode', mode);
    localStorage.setItem('activeTab', activeTab);
  }, [mode, activeTab]);

  useEffect(() => {
    document.body.classList.remove('bg-light', 'bg-dark');
    document.body.classList.add(`bg-${mode}`);
  }, [mode]);

  const pathname = (typeof window !== 'undefined' && window.location && window.location.pathname) ? window.location.pathname : '/';
  const isAppsPage = pathname === '/apps' || pathname === '/apps/';

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
  };

  const toggleMode = (cls) => {
    const newMode = cls === 'light' ? 'light' : 'dark';
    setMode(newMode);
    showAlert("Mode has been changed...", "success");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'textForm':
        return <TextForm showAlert={showAlert} heading="Try Worded — Advanced Text Analysis & Formatting Tools" mode={mode} adClient={adClient} adSlot={textFormAdSlot} />;
      case 'textComparison':
        return <TextComparison showAlert={showAlert} mode={mode} adClient={adClient} adSlot={comparisonAdSlot} />;
      case 'utilityTools':
        return <UtilityTools showAlert={showAlert} mode={mode} adClient={adClient} adSlot={toolsAdSlot} />;
      default:
        return <TextForm showAlert={showAlert} heading="Try Worded — Advanced Text Analysis & Formatting Tools" mode={mode} adClient={adClient} adSlot={textFormAdSlot} />;
    }
  };

  const tabAccent = '#6366f1';
  const adClient = process.env.REACT_APP_ADSENSE_CLIENT_ID || '';
  const topAdSlot = process.env.REACT_APP_ADSENSE_TOP_SLOT || '';
  const midAdSlot = process.env.REACT_APP_ADSENSE_MID_SLOT || '';
  const textFormAdSlot = process.env.REACT_APP_ADSENSE_TEXTFORM_SLOT || '';
  const comparisonAdSlot = process.env.REACT_APP_ADSENSE_COMPARISON_SLOT || '';
  const toolsAdSlot = process.env.REACT_APP_ADSENSE_TOOLS_SLOT || '';

  return (
    <>
      <Navbar
        title="TextMint"
        mode={mode}
        toggleMode={toggleMode}
        onPrivacyPolicyClick={() => setShowPrivacyPolicy(true)}
      />
      {isAppsPage ? (
        <AppsList mode={mode} adClient={adClient} adSlot={midAdSlot} onPrivacyPolicyClick={() => setShowPrivacyPolicy(true)} />
      ) : (
        <>
          <Alert alert={alert} onDismiss={() => setAlert(null)} />
          <CookieConsentBanner />
          <div className="container my-3 page-container">
            <AdBanner
              client={adClient}
              slot={topAdSlot}
              mode={mode}
              ariaLabel="Sponsored banner placement"
              className="mb-4"
              minHeight="120px"
            />

            <div className="row g-4 home-layout-row">
              <main className="col-12 col-lg-8 col-xxl-9">
                {/* Tab Navigation */}
                <div className="mb-4 py-4 main-toolbar d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <ul
                    className="nav nav-tabs flex-grow-1"
                    style={{ borderBottom: `2px solid ${mode === 'dark' ? '#2d3748' : '#e2e5fc'}` }}
                  >
                    {[
                      { key: 'textForm', label: 'Text Editor' },
                      { key: 'textComparison', label: 'Text Comparison' },
                      { key: 'utilityTools', label: 'Utility Tools' },
                    ].map(tab => (
                      <li className="nav-item" key={tab.key}>
                        <button
                          className={`nav-link modern-tab-link border-0 ${activeTab === tab.key ? 'active' : ''}`}
                          onClick={() => setActiveTab(tab.key)}
                          aria-current={activeTab === tab.key ? 'page' : undefined}
                          style={{
                            color: activeTab === tab.key ? tabAccent : (mode === 'dark' ? '#8b949e' : '#6b7280'),
                            fontWeight: activeTab === tab.key ? '600' : '400',
                            background: 'transparent',
                            borderRadius: 0,
                            padding: '10px 18px',
                            transition: 'color 0.2s ease, transform 0.2s ease'
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

                <AdBanner
                  client={adClient}
                  slot={midAdSlot}
                  mode={mode}
                  ariaLabel="Sponsored content placement"
                  className="mt-4 d-block d-lg-none"
                />
              </main>

              <aside className="col-12 col-lg-4 col-xxl-3 d-none d-lg-block">
                <div className="home-ad-rail">
                  <AdBanner
                    client={adClient}
                    slot={topAdSlot}
                    mode={mode}
                    ariaLabel="Sponsored sidebar placement"
                    className="mb-3"
                    minHeight="250px"
                  />
                  <AdBanner
                    client={adClient}
                    slot={midAdSlot}
                    mode={mode}
                    ariaLabel="Sponsored sidebar placement secondary"
                    className="mt-3"
                    minHeight="250px"
                  />
                </div>
              </aside>
            </div>
          </div>

          <PrivacyPolicyModal
            open={showPrivacyPolicy}
            mode={mode}
            onClose={() => setShowPrivacyPolicy(false)}
          />

          {activeTab === 'textForm' && (
            <AdBanner
              client={adClient}
              slot={textFormAdSlot}
              mode={mode}
              ariaLabel="Sponsored inline placement for the text editor"
              className="container mb-4"
              minHeight="280px"
            />
          )}

          {activeTab === 'textComparison' && (
            <AdBanner
              client={adClient}
              slot={comparisonAdSlot}
              mode={mode}
              ariaLabel="Sponsored inline placement for the comparison tool"
              className="container mb-4"
              minHeight="280px"
            />
          )}

          {activeTab === 'utilityTools' && (
            <AdBanner
              client={adClient}
              slot={toolsAdSlot}
              mode={mode}
              ariaLabel="Sponsored inline placement for utility tools"
              className="container mb-4"
              minHeight="280px"
            />
          )}

          <footer
            className="custom-app-footer mt-5 pt-4 pb-2 px-5 d-flex flex-wrap justify-content-between align-items-center gap-3"
            style={{
              borderTop: `1px solid ${mode === 'dark' ? '#2d3748' : '#e5e7eb'}`,
              color: mode === 'dark' ? '#8b949e' : '#6b7280',
              fontSize: '0.9rem'
            }}
          >
            <button
              type="button"
              className="btn btn-link p-0 footer-item-left"
              onClick={() => setShowPrivacyPolicy(true)}
              style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}
            >
              Privacy Policy
            </button>
            <span className="footer-item-center" style={{ fontWeight: '500' }}>Made with ❤️ in India</span>
            <span className="footer-item-right">© {new Date().getFullYear()} TextMint. All rights reserved.</span>
          </footer>
        </>
      )}
    </>
  );
}

export default App;
