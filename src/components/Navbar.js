import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Navbar({ title = 'Set title here', mode = 'light', toggleMode = () => {}, onPrivacyPolicyClick = () => {} }) {
    const [showHelp, setShowHelp] = useState(false);
    const props = { title, mode };
    const isDarkMode = props.mode === 'dark';
    const currentPath = typeof window !== 'undefined' && window.location ? window.location.pathname : '/';
    const isAppsPage = currentPath === '/apps' || currentPath === '/apps/';
    const isHomePage = !isAppsPage;

    const shortcuts = [
        { keys: 'Ctrl + S', action: 'Auto-save document' },
        { keys: 'Ctrl + 1/2/3', action: 'Switch between tabs' },
        { keys: 'Ctrl + C', action: 'Copy text' },
        { keys: 'Ctrl + V', action: 'Paste text' },
    ];

    return (
        <>
            <nav
                className={`navbar navbar-expand-lg`}
                style={{
                    background: mode === 'dark'
                        ? 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)'
                        : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    boxShadow: '0 2px 16px rgba(99,102,241,0.18)',
                    position: 'sticky',
                    top: '0',
                    zIndex: '10'
                }}
            >
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center fw-bold" href="/" style={{ color: 'white', letterSpacing: '0.5px' }}>
                        <img src="/textmint-logo.svg" alt="TextMint Logo" style={{ height: '30px', marginRight: '10px' }} />
                        {props.title}
                    </a>
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
                            <li className="nav-item">
                                <a 
                                    className={`nav-link navbar-tab-link ${isHomePage ? 'active' : ''}`} 
                                    href="/" 
                                    style={{ fontWeight: 600, padding: '8px 16px', borderRadius: '8px' }}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a 
                                    className={`nav-link navbar-tab-link ${isAppsPage ? 'active' : ''}`} 
                                    href="/apps" 
                                    style={{ fontWeight: 600, padding: '8px 16px', borderRadius: '8px' }}
                                >
                                    Apps
                                </a>
                            </li>
                        </ul>

                        {/* Help Button */}
                        <button
                            className="btn btn-sm me-3"
                            onClick={() => setShowHelp(!showHelp)}
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '8px',
                                fontWeight: '500'
                            }}
                        >
                            Help
                        </button>

                        <button
                            type="button"
                            className="theme-toggle-button"
                            aria-pressed={isDarkMode}
                            onClick={() => toggleMode(isDarkMode ? 'light' : 'dark')}
                        >
                            <span className="theme-toggle-button__icon">
                                {isDarkMode ? <FiSun /> : <FiMoon />}
                            </span>
                            {/* <span className="theme-toggle-button__text">
                                {isDarkMode ? 'Light mode' : 'Dark mode'}
                            </span> */}
                        </button>

                    </div>
                </div>
            </nav>

            {/* Help Modal */}
            {showHelp && (
                <div 
                    className="modal show d-block" 
                    tabIndex="-1" 
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setShowHelp(false)}
                >
                    <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content" style={{
                            backgroundColor: props.mode === 'dark' ? '#0f1419' : 'white',
                            color: props.mode === 'dark' ? '#e6edf3' : '#1f2328'
                        }}>
                            <div className="modal-header" style={{ borderBottom: `2px solid ${props.mode === 'dark' ? '#6366f1' : '#6366f1'}` }}>
                                <h5 className="modal-title" style={{ color: '#6366f1', fontWeight: '600' }}>TextMint — Help & Shortcuts</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowHelp(false)}
                                    style={{ filter: props.mode === 'dark' ? 'invert(1)' : 'none' }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <h6 style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1', fontWeight: '600', marginBottom: '15px' }}>⌨️ Keyboard Shortcuts</h6>
                                <table className="table table-striped" style={{ 
                                    color: props.mode === 'dark' ? '#e0e0e0' : '#333'
                                }}>
                                    <thead>
                                        <tr style={{ backgroundColor: props.mode === 'dark' ? '#1e2a3a' : '#f3f4ff' }}>
                                            <th style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1', fontWeight: '600' }}>Shortcut</th>
                                            <th style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1', fontWeight: '600' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shortcuts.map((shortcut, index) => (
                                            <tr key={index}>
                                                <td><kbd style={{
                                                    background: props.mode === 'dark' ? '#1e2a3a' : '#eef2ff',
                                                    border: `1px solid ${props.mode === 'dark' ? '#6366f1' : '#c7d2fe'}`,
                                                    borderRadius: '4px',
                                                    padding: '2px 8px',
                                                    fontSize: '0.85rem',
                                                    color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1'
                                                }}>{shortcut.keys}</kbd></td>
                                                <td>{shortcut.action}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <h6 className="mt-4" style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1', fontWeight: '600', marginBottom: '15px' }}>✨ Features</h6>
                                <ul style={{ color: props.mode === 'dark' ? '#e0e0e0' : '#333' }}>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1' }}>Text Editor:</strong> Transform, analyze, and format text with 30+ tools</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1' }}>Text Comparison:</strong> Compare two texts and find similarities</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1' }}>Utility Tools:</strong> JSON formatter, Base64 encoder, and more</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1' }}>Auto-save:</strong> Your work is automatically saved every 2 seconds</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1' }}>Export:</strong> Download as TXT, HTML, or print your document</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1' }}>Dark / Light Mode:</strong> Toggle anytime with the moon / sun button in the main toolbar</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#a5b4fc' : '#6366f1' }}>Privacy:</strong> Ads only load after consent, and the privacy policy is always one click away</li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={onPrivacyPolicyClick}
                                    style={{ borderRadius: '8px', padding: '8px 20px', fontWeight: '500' }}
                                >
                                    Privacy Policy
                                </button>
                                <button 
                                    type="button"
                                    className="btn"
                                    onClick={() => setShowHelp(false)}
                                    style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: '500' }}
                                >
                                    Got it!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

Navbar.propTypes = {
    title: PropTypes.string,
    mode: PropTypes.string,
    toggleMode: PropTypes.func,
    onPrivacyPolicyClick: PropTypes.func
}