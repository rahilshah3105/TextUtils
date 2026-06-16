import React, { useEffect, useRef } from 'react';

function loadAdSenseScript(client) {
  if (!client || typeof document === 'undefined') {
    return;
  }

  const existingScript = document.querySelector('script[data-textmint-adsense="true"]');
  if (existingScript) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  script.setAttribute('data-ad-client', client);
  script.setAttribute('data-textmint-adsense', 'true');
  document.head.appendChild(script);
}

export default function AdBanner({ client, slot, mode = 'light', className = '', ariaLabel = 'Advertisement', minHeight = '90px' }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (!client || !slot || typeof window === 'undefined') {
      return;
    }

    loadAdSenseScript(client);

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad scripts can fail silently in dev or without a valid account.
    }
  }, [client, slot]);

  if (!client || !slot) {
    return (
      <div
        className={`ad-banner ad-banner--placeholder ${className}`.trim()}
        role="note"
        aria-label={ariaLabel}
        style={{
          border: `1px dashed ${mode === 'dark' ? '#4b5563' : '#cbd5e1'}`,
          borderRadius: '14px',
          padding: '16px',
          minHeight,
          background: mode === 'dark' ? '#111827' : '#f8fafc',
          color: mode === 'dark' ? '#cbd5e1' : '#475569',
          maxWidth: '350px',
        }}
      >
        <strong style={{ display: 'block', marginBottom: '4px', color: mode === 'dark' ? '#e5e7eb' : '#0f172a' }}>
          Ad space reserved
        </strong>
        Configure `REACT_APP_ADSENSE_CLIENT_ID` and slot IDs to enable live ads after consent.
      </div>
    );
  }

  return (
    <div className={`ad-banner ${className}`.trim()} aria-label={ariaLabel}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}