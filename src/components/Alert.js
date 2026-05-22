import React, { useEffect } from 'react'
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiXCircle, FiX } from 'react-icons/fi';

function Alert(props) {
    const { alert, onDismiss } = props;

    const alertMeta = {
        success: {
            icon: FiCheckCircle,
            title: 'Success',
            accent: '#16a34a',
            background: 'linear-gradient(135deg, rgba(240,253,244,0.98) 0%, rgba(220,252,231,0.96) 100%)',
            border: 'rgba(34,197,94,0.35)'
        },
        danger: {
            icon: FiXCircle,
            title: 'Error',
            accent: '#dc2626',
            background: 'linear-gradient(135deg, rgba(255,241,242,0.98) 0%, rgba(254,226,226,0.96) 100%)',
            border: 'rgba(239,68,68,0.35)'
        },
        warning: {
            icon: FiAlertTriangle,
            title: 'Warning',
            accent: '#d97706',
            background: 'linear-gradient(135deg, rgba(255,251,235,0.98) 0%, rgba(254,243,199,0.96) 100%)',
            border: 'rgba(245,158,11,0.35)'
        },
        info: {
            icon: FiInfo,
            title: 'Info',
            accent: '#2563eb',
            background: 'linear-gradient(135deg, rgba(239,246,255,0.98) 0%, rgba(219,234,254,0.96) 100%)',
            border: 'rgba(59,130,246,0.35)'
        }
    };

    const meta = alertMeta[alert?.type] || alertMeta.info;
    const Icon = meta.icon;

    useEffect(() => {
        if (!alert) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            onDismiss?.();
        }, 10000);

        return () => window.clearTimeout(timer);
    }, [alert, onDismiss]);
    
    return (
        <>
            {alert && (
                <div className="modern-alert-shell" role="status" aria-live="polite">
                    <div
                        className={`modern-alert modern-alert-${alert.type || 'info'}`}
                        style={{
                            background: meta.background,
                            borderColor: meta.border,
                            boxShadow: '0 18px 40px rgba(15, 23, 42, 0.16)',
                            color: '#0f172a'
                        }}
                    >
                        <div className="modern-alert__icon" style={{ color: meta.accent }}>
                            <Icon />
                        </div>
                        <div className="modern-alert__content">
                            <div className="modern-alert__title" style={{ color: meta.accent }}>
                                {meta.title}
                            </div>
                            <div className="modern-alert__message">
                                {alert.msg}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="modern-alert__close"
                            onClick={onDismiss}
                            aria-label="Dismiss alert"
                        >
                            <FiX />
                        </button>
                        <div
                            className="modern-alert__progress"
                            style={{ backgroundColor: meta.accent }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Alert
