import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function Navbar({ title = 'Set title here', mode = 'light', toggleMode = () => {} }) {
    const [showHelp, setShowHelp] = useState(false);
    const props = { title, mode, toggleMode };

    let color = {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'white'
    }

    let styleDiv = {
        // height: '30px',
        width: '10vw',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }

    const shortcuts = [
        { keys: 'Ctrl + S', action: 'Auto-save document' },
        { keys: 'Ctrl + 1/2/3', action: 'Switch between tabs' },
        { keys: 'Ctrl + C', action: 'Copy text' },
        { keys: 'Ctrl + V', action: 'Paste text' },
    ];

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`} style={{ color: props.mode === 'dark' ? 'white' : 'black', backgroundColor: props.mode === 'dark' ? 'black' : 'white', position: 'sticky', top: '0', zIndex: '10' }}>
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="/" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                        <img src="/worded-logo.svg" alt="Worded Logo" style={{ height: '32px', marginRight: '10px' }} />
                        {props.title}
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                                    Themes
                                </a>
                                <ul className="dropdown-menu" style={{ 
                                    background: props.mode === 'dark' 
                                        ? '#1a2332' 
                                        : '#ffffff',
                                    border: '1px solid',
                                    borderColor: props.mode === 'dark' ? '#373e47' : '#d0d7de',
                                    boxShadow: '0 8px 24px rgba(140, 149, 159, 0.2)'
                                }}>
                                    <li style={color}>
                                        <div 
                                            className="bg-primary rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('primary') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#0969da',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
                                            }}
                                        >
                                            Blue
                                        </div>
                                    </li>
                                    <li style={color}>
                                        <div 
                                            className="bg-danger rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('danger') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#cf222e',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
                                            }}
                                        >
                                            Red
                                        </div>
                                    </li>
                                    <li style={color}>
                                        <div 
                                            className="bg-success rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('success') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#1a7f37',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
                                            }}
                                        >
                                            Green
                                        </div>
                                    </li>
                                    <li style={color}>
                                        <div 
                                            className="bg-warning rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('warning') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#bf8700',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
                                            }}
                                        >
                                            Yellow
                                        </div>
                                    </li>
                                    <li style={color}>
                                        <div 
                                            className="bg-secondary rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('secondary') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#6e7781',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
                                            }}
                                        >
                                            Grey
                                        </div>
                                    </li>
                                    <li style={color}>
                                        <div 
                                            className="bg-info rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('info') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#0969da',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
                                            }}
                                        >
                                            Aqua
                                        </div>
                                    </li>
                                    <li style={color}>
                                        <div 
                                            className="bg-dark rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('dark') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#1a2332',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                                            }}
                                        >
                                            Black
                                        </div>
                                    </li>
                                    <li style={color}>
                                        <div 
                                            className="bg-light text-dark rounded mx-1 my-1 theme-pill" 
                                            onClick={() => { props.toggleMode('light') }} 
                                            style={{
                                                ...styleDiv,
                                                background: '#f6f8fa',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                                                color: '#24292f',
                                                border: '1px solid #d0d7de'
                                            }}
                                        >
                                            White
                                        </div>
                                    </li>

                                    {/* <li><hr class="dropdown-divider" /></li> */}
                                </ul>
                            </li>

                        </ul>

                        {/* Help Button */}
                        <button 
                            className="btn btn-sm btn-outline-primary me-3" 
                            onClick={() => setShowHelp(!showHelp)}
                            style={{ 
                                borderColor: props.mode === 'dark' ? 'white' : '#0d6efd',
                                color: props.mode === 'dark' ? 'white' : '#0d6efd'
                            }}
                        >
                            Help
                        </button>

                        {/* Dark Mode Toggle */}
                        <div className="form-check form-switch">
                            <input 
                                className="form-check-input" 
                                onClick={() => { props.toggleMode(props.mode === 'light' ? 'dark' : 'light') }} 
                                type="checkbox" 
                                id="flexSwitchCheckChecked" 
                                checked={props.mode === 'dark'}
                                onChange={() => {}}
                                style={{ cursor: 'pointer' }}
                            />
                            <label 
                                className="form-check-label" 
                                htmlFor="flexSwitchCheckChecked" 
                                style={{ color: props.mode === 'dark' ? 'white' : 'black', cursor: 'pointer' }}
                            >
                                {props.mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            </label>
                        </div>

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
                            backgroundColor: props.mode === 'dark' ? '#1a1a2e' : 'white',
                            color: props.mode === 'dark' ? 'white' : 'black'
                        }}>
                            <div className="modal-header" style={{ borderBottom: `2px solid ${props.mode === 'dark' ? '#4a90e2' : '#0d6efd'}` }}>
                                <h5 className="modal-title" style={{ color: props.mode === 'dark' ? '#4a90e2' : '#0d6efd', fontWeight: '600' }}>🚀 Worded - Help & Keyboard Shortcuts</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowHelp(false)}
                                    style={{ filter: props.mode === 'dark' ? 'invert(1)' : 'none' }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <h6 style={{ color: props.mode === 'dark' ? '#4a90e2' : '#0d6efd', fontWeight: '600', marginBottom: '15px' }}>⌨️ Keyboard Shortcuts</h6>
                                <table className="table table-striped" style={{ 
                                    color: props.mode === 'dark' ? '#e0e0e0' : '#333'
                                }}>
                                    <thead>
                                        <tr style={{ backgroundColor: props.mode === 'dark' ? '#2a2a3e' : '#f8f9fa' }}>
                                            <th style={{ color: props.mode === 'dark' ? '#4a90e2' : '#0d6efd', fontWeight: '600' }}>Shortcut</th>
                                            <th style={{ color: props.mode === 'dark' ? '#4a90e2' : '#0d6efd', fontWeight: '600' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shortcuts.map((shortcut, index) => (
                                            <tr key={index}>
                                                <td><kbd style={{
                                                    background: props.mode === 'dark' ? '#2a2a3e' : '#e9ecef',
                                                    border: `1px solid ${props.mode === 'dark' ? '#4a90e2' : '#ced4da'}`,
                                                    borderRadius: '3px',
                                                    padding: '2px 6px',
                                                    fontSize: '0.85rem',
                                                    color: props.mode === 'dark' ? '#4a90e2' : '#495057'
                                                }}>{shortcut.keys}</kbd></td>
                                                <td>{shortcut.action}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <h6 className="mt-4" style={{ color: props.mode === 'dark' ? '#4a90e2' : '#0d6efd', fontWeight: '600', marginBottom: '15px' }}>✨ Features</h6>
                                <ul style={{ color: props.mode === 'dark' ? '#e0e0e0' : '#333' }}>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#66b3ff' : '#0d6efd' }}>Text Editor:</strong> Transform, analyze, and format text with 30+ tools</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#66b3ff' : '#0d6efd' }}>Text Comparison:</strong> Compare two texts and find similarities</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#66b3ff' : '#0d6efd' }}>Utility Tools:</strong> JSON formatter, Base64 encoder, and more</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#66b3ff' : '#0d6efd' }}>Auto-save:</strong> Your work is automatically saved every 2 seconds</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#66b3ff' : '#0d6efd' }}>Export:</strong> Download as TXT, HTML, or print your document</li>
                                    <li><strong style={{ color: props.mode === 'dark' ? '#66b3ff' : '#0d6efd' }}>Dark Mode:</strong> Easy on the eyes with beautiful themes</li>
                                </ul>

                                <h6 className="mt-4" style={{ color: props.mode === 'dark' ? '#4a90e2' : '#0d6efd', fontWeight: '600', marginBottom: '15px' }}>🎨 Themes</h6>
                                <p style={{ color: props.mode === 'dark' ? '#e0e0e0' : '#333' }}>Click on the "Themes" dropdown in the navbar to choose from 7 color themes!</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={() => setShowHelp(false)}
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
    toggleMode: PropTypes.func
}