import React from 'react';
import './AppsList.css';
import AdBanner from './AdBanner';

const APPS = [
    {
        title: 'Task Manager',
        description: 'Plan your day with a clean task board for creating, tracking, and completing daily to-dos.',
        url: 'https://todo-phi-neon-51.vercel.app/',

    },
    {
        title: 'Code Formatter',
        description: 'Format your code snippets with a simple interface supporting multiple languages and themes. Also helps you to beautify your code and make it more readable, and many more features there to make your coding simpler and smooth..',
        url: 'https://code-line-formatter.vercel.app/',
    },
    {
        title: 'Password Manager',
        description: 'Generate secure passwords and manage them in a local vault with simple import/export support.',
        url: 'https://password-manager-pi-rosy.vercel.app/',
    },
    {
        title: 'NewsApp (NewsPulse)',
        description: 'Read latest headlines by category with a responsive news reader featuring bookmarks and dark mode.',
        url: 'https://getyournewspulse.netlify.app/',
    },
    {
        title: 'Bing Cypress Search',
        description: 'A Cypress automation project for validating Bing search flows and end-to-end browser scenarios.',
        url: 'https://github.com/rahilshah3105/bing-cypress-search',
    },
];

function getAppBadge(title) {
    return title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();
}

export default function AppsList({ mode = 'light', adClient = '', adSlot = '' }) {
    const isDark = mode === 'dark';
    return (
        <div className={`apps-page ${isDark ? 'dark' : 'light'}`}>
            <div className="apps-container container page-container py-5">
                <div className="row gx-4">
                    <main className="col-12 col-lg-8 col-xxl-9">
                        <h1 className="apps-heading">Our Apps</h1>
                        <p className="lead" style={{ color: isDark ? '#cbd5e1' : '#374151' }}>Explore our suite of tools and projects — click any card to visit.</p>

                        <div className="apps-grid">
                            {APPS.map((app, idx) => (
                                <a key={idx} className="app-card" href={app.url} target="_blank" rel="noopener noreferrer">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div className="app-card-badge" aria-hidden="true">
                                            {getAppBadge(app.title)}
                                        </div>
                                        <div className="app-card-content">
                                            <div className="app-card-copy">
                                                <div className="app-card-title">{app.title}</div>
                                                <div className="app-card-desc">{app.description}</div>
                                            </div>
                                            {/* <div className="app-card-meta">Word tools • Productivity</div> */}
                                        </div>
                                    </div>
                                    {/* <div className="app-card-cta">Open</div> */}
                                </a>
                            ))}
                        </div>

                        {/* Inline Ad for mobile/tablet screens */}
                        <div className="d-block d-lg-none mt-4">
                            <AdBanner client={adClient} slot={adSlot} mode={mode} minHeight="250px" ariaLabel="Mobile apps page ad" />
                        </div>
                    </main>

                    <aside className="col-12 col-lg-4 col-xxl-3 d-none d-lg-block">
                        <div className="home-ad-rail">
                            <AdBanner client={adClient} slot={adSlot} mode={mode} className="mb-3" minHeight="250px" ariaLabel="Apps page ad" />
                            <AdBanner client={adClient} slot={adSlot} mode={mode} className="mt-3" minHeight="250px" ariaLabel="Secondary ad" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
