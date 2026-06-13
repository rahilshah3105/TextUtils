import React from 'react';

export default function PrivacyPolicyModal({ open, mode = 'light', onClose = () => {} }) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable" onClick={(event) => event.stopPropagation()}>
        <div className="modal-content" style={{ backgroundColor: mode === 'dark' ? '#0f1419' : 'white', color: mode === 'dark' ? '#e6edf3' : '#1f2328' }}>
          <div className="modal-header" style={{ borderBottom: `1px solid ${mode === 'dark' ? '#2d3748' : '#e5e7eb'}` }}>
            <h5 className="modal-title" id="privacy-policy-title" style={{ color: '#6366f1', fontWeight: '600' }}>
              TextMint Privacy Policy
            </h5>
            <button type="button" className="btn-close" onClick={onClose} style={{ filter: mode === 'dark' ? 'invert(1)' : 'none' }} />
          </div>
          <div className="modal-body">
            <p>
              TextMint is designed to keep your text tools fast and private. We only use data that is necessary to run the site, remember preferences, and show ads after consent.
            </p>
            <h6>What we store</h6>
            <ul>
              <li>Theme and tab preference in localStorage.</li>
              <li>Cookie consent choice in localStorage.</li>
              <li>Ad network data only after you accept ad cookies.</li>
            </ul>
            <h6>Why we use ads</h6>
            <p>
              Ads help keep the core text tools free. We do not ask users to click ads, and we do not place deceptive prompts around ads.
            </p>
            <h6>Your choices</h6>
            <ul>
              <li>You can keep ad cookies disabled and still use the app.</li>
              <li>You can clear your browser storage at any time to reset preferences.</li>
              <li>You should publish a full policy page with your contact details before going live.</li>
            </ul>
            <p className="mb-0">
              For production, connect your approved ad network account, add a real contact email, and keep this policy aligned with your actual data practices.
            </p>
            <p className="mt-3 mb-1" style={{textAlign: 'center', fontSize: '1rem', color: mode === 'dark' ? '#e2e8f0' : '#374151'}}>Made with ❤️ in India</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose} style={{ borderRadius: '8px' }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}