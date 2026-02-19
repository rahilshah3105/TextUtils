import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    
    const getAlertTextColor = (type) => {
        const colors = {
            success: '#0f5132',
            danger: '#842029',
            warning: '#664d03',
            info: '#055160',
            primary: '#084298',
            secondary: '#41464b'
        };
        return colors[type] || '#000000';
    }
    
    return (
        <>
            <div style={{height: '50px'}}>
                {props.alert && <div 
                    className={`alert alert-${props.alert.type} alert-dismissible fade show`} 
                    role="alert"
                    style={{
                        color: getAlertTextColor(props.alert.type),
                        fontWeight: '500'
                    }}
                >
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
            </div>
        </>
    )
}

export default Alert
