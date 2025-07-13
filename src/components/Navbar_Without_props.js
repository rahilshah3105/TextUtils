import React from 'react'
// import PropTypes from 'prop-types'
// import React, { useState } from 'react';
// import { CgDarkMode } from "react-icons/cg";

export default function Navbar_Without_props({title, mode, toggleMode}) {

    let color = {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'white'
    }

    let styleDiv = {
        height: '30px',
        width: '8vw',
        cursor: 'pointer'
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`} style={{ color: mode === 'dark' ? 'white' : 'black', backgroundColor: mode === 'dark' ? 'black' : 'white', position: 'sticky', top: '0', zIndex: '10' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{ color: mode === 'dark' ? 'white' : 'black' }}>{title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/" style={{ color: mode === 'dark' ? 'white' : 'black' }}>Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                    Themes
                                </a>
                                <ul className="dropdown-menu" style={{ backgroundColor: 'purple' }}>
                                    <li style={color}>
                                        <div className="bg-primary rounded mx-1 my-1" onClick={() => { toggleMode('primary') }} style={styleDiv}>Blue</div>
                                    </li>
                                    <li style={color}>
                                        <div className="bg-danger rounded mx-1 my-1" onClick={() => { toggleMode('danger') }} style={styleDiv}>Red</div>
                                    </li>
                                    <li style={color}>
                                        <div className="bg-success rounded mx-1 my-1" onClick={() => { toggleMode('success') }} style={styleDiv}>Green</div>
                                    </li>
                                    <li style={color}>
                                        <div className="bg-warning rounded mx-1 my-1" onClick={() => { toggleMode('warning') }} style={styleDiv}>Yellow</div>
                                    </li>
                                    <li style={color}>
                                        <div className="bg-secondary rounded mx-1 my-1" onClick={() => { toggleMode('secondary') }} style={styleDiv}>Grey</div>
                                    </li>
                                    <li style={color}>
                                        <div className="bg-info rounded mx-1 my-1" onClick={() => { toggleMode('info') }} style={styleDiv}>Aqua</div>
                                    </li>
                                    <li style={color}>
                                        <div className="bg-dark rounded mx-1 my-1" onClick={() => { toggleMode('dark') }} style={styleDiv}>Black</div>
                                    </li>
                                    <li style={color}>
                                        <div className="bg-light text-dark rounded mx-1 my-1" onClick={() => { toggleMode('light') }} style={styleDiv}>White</div>
                                    </li>

                                    {/* <li><hr class="dropdown-divider" /></li> */}
                                </ul>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="/" style={{ color: mode === 'dark' ? 'white' : 'black' }}>{aboutText}</a>
                            </li> */}
                        </ul>

                        <form className="d-flex mx-4 w-25" role="search">
                            <input className="form-control me-3" id='search' name='search' type="search" placeholder="Search Here..." aria-label="Search" style={{ backgroundColor: mode === 'dark' ? 'black' : 'white', color: mode === 'dark' ? 'white' : 'black' }} />
                            <button className="btn btn-outline-success" type="submit" style={{ backgroundColor: mode === 'dark' ? 'black' : 'white', color: mode === 'dark' ? 'white' : 'black' }}>Search</button>
                        </form>

                        {/* <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'}`}>
                            <input className="form-check-input" onClick={() => { toggleMode(mode === 'light' ? '#042743' : 'light') }} type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer' }} />
                            <label className="form-check-label text-capitalize" htmlFor="search" style={{ color: mode === 'dark' ? 'white' : 'black' }}>{mode === 'light' ? 'dark' : 'light'} Mode</label>
                        </div> */}

                        <div className="form-check form-switch">
                            <input className="form-check-input" onClick={() => { toggleMode(mode === 'light' ? '#042743' : 'light') }} type="checkbox" id="flexSwitchCheckChecked" defaultChecked />
                            <label className="form-check-label text-capitalize" htmlFor="flexSwitchCheckChecked" style={{ color: mode === 'dark' ? 'light' : 'dark' }}>
                                {mode === 'dark' ? 'dark' : 'light'} Mode
                            </label>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

// Navbar.prototypes = {
//     title: PropTypes.string.isRequired,
//     aboutText: PropTypes.string
// }

// Navbar.default= {
//     title: 'Set title here',
//     aboutText: 'About TextUtils'
// }