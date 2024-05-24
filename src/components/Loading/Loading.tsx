// src/components/Loading/LoadingPopup.tsx

import React from 'react';
import './Loading.css';

interface LoadingPopupProps {
    message: string;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({message}) => {
    return (
        <div className="loading-popup">
            <div className="loading-popup-container">
                <div className="loading-popup-content">
                    <h2>{message}</h2>
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPopup;