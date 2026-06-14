import React from 'react';
import './AppsList.css';
import AdBanner from './AdBanner';
import { ExternalLink, ClipboardList, Code, KeyRound, Newspaper, SearchCode } from 'lucide-react';

const APPS = [
    {
        title: 'Task Manager',
        description: 'Plan your day with a clean task board for creating, tracking, and completing daily to-dos.',
        url: 'https://taskmint.app/',
        tag: 'Productivity',
        icon: <ClipboardList size={22} className="text-blue-400" />
    },
    {
        title: 'Code Formatter',
        description: 'Format your code snippets with a simple interface supporting multiple languages and themes. Also helps you to beautify your code and make it more readable, and many more features there to make your coding simpler and smooth..',
        url: 'https://devmint-tools.vercel.app/',
        tag: 'Developer Tools',
        icon: <Code size={22} className="text-purple-400" />
    },
    {
        title: 'Password Manager',
        description: 'Generate secure passwords and manage them in a local vault with simple import/export support.',
        url: 'https://passgen-tools.vercel.app/',
        tag: 'Security',
        icon: <KeyRound size={22} className="text-emerald-400" />
    },
    {
        title: 'NewsApp (NewsPulse)',
        description: 'Read latest headlines by category with a responsive news reader featuring bookmarks and dark mode.',
        url: 'https://getyournewspulse.netlify.app/',
        tag: 'Information',
        icon: <Newspaper size={22} className="text-amber-400" />
    },
    {
        title: 'Bing Cypress Search',
        description: 'A Cypress automation project for validating Bing search flows and end-to-end browser scenarios.',
        url: 'https://github.com/rahilshah3105/bing-cypress-search',
        tag: 'Automation',
        icon: <SearchCode size={22} className="text-rose-400" />
    },
];

export default function AppsList({ mode = 'light', adClient = '', adSlot = '', onPrivacyPolicyClick = () => { } }) {
    const isDark = mode === 'dark';
    return (
        <div className={`apps-page ${isDark ? 'dark' : 'light'}`}>
            <div className="apps-container container page-container" style={{ minHeight: 'auto' }}>
                <div className="row gx-4">
                    <main className="col-12 col-lg-8 col-xxl-9">
                        <h1 className="apps-heading">Our Apps</h1>
                        <p className="lead" style={{ color: isDark ? '#cbd5e1' : '#374151' }}>Explore our suite of tools and projects — click any card to visit.</p>

                        <div className="apps-grid">
                            {APPS.map((app, idx) => (
                                <a key={idx} className={`app-card theme-${app.tag.toLowerCase().replace(/\s+/g, '-')}`} href={app.url} target="_blank" rel="noopener noreferrer">
                                    <div className="app-card-header">
                                        <div className="app-card-header-left">
                                            <div className={`app-card-icon-wrapper theme-${app.tag.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {app.icon}
                                            </div>
                                            <div className="app-card-title-group">
                                                <span className="app-card-tag">{app.tag}</span>
                                                <h3 className="app-card-title">{app.title}</h3>
                                            </div>
                                        </div>
                                        <ExternalLink size={16} className="app-card-icon-external" />
                                    </div>
                                    <p className="app-card-description">{app.description}</p>
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

                <footer
                    className="custom-app-footer mt-5 pt-4 pb-2 d-flex flex-wrap justify-content-between align-items-center gap-3"
                    style={{
                        borderTop: `1px solid ${isDark ? '#2d3748' : '#e5e7eb'}`,
                        color: isDark ? '#8b949e' : '#6b7280',
                        fontSize: '0.9rem'
                    }}
                >
                    <button
                        type="button"
                        className="btn btn-link p-0 footer-item-left"
                        onClick={onPrivacyPolicyClick}
                        style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}
                    >
                        Privacy Policy
                    </button>
                    <span className="footer-item-center" style={{ fontWeight: '500' }}>Made with ❤️ in India</span>
                    <span className="footer-item-right">© {new Date().getFullYear()} TextMint. All rights reserved.</span>
                </footer>
            </div>
        </div>
    );
}
