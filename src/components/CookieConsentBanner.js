import React, { useEffect, useState } from 'react';

const CONSENT_KEY = 'textmint_cookie_consent';

function readConsent() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(CONSENT_KEY);
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState(readConsent());

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  const updateConsent = (value) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  if (consent) {
    return null;
  }

  return (
    <div
      className="cookie-consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 20,
        margin: '0 12px 12px',
        borderRadius: '16px',
        padding: '14px 16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        background: 'rgba(15, 23, 42, 0.96)',
        color: '#e2e8f0',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.28)'
      }}
    >
      <div style={{ maxWidth: '760px' }}>
        <strong style={{ display: 'block', marginBottom: '4px' }}>Cookies and ads</strong>
        We use essential cookies for preferences and optional ad cookies only after you choose to accept. You can keep browsing with ads disabled.
      </div>
      <div className="d-flex gap-2 flex-wrap">
        <button type="button" className="btn btn-outline-light" onClick={() => updateConsent('rejected')}>
          Only essential
        </button>
        <button type="button" className="btn btn-primary" onClick={() => updateConsent('accepted')}>
          Accept ads
        </button>
      </div>
    </div>
  );
}