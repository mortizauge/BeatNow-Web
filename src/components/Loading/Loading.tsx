// src/components/Loading/Loading.tsx

import React, { useEffect, useState } from 'react';
import './Loading.css';

interface LoadingPopupProps {
    message: string;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({message}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div className={`loading-popup ${isVisible ? 'visible' : ''}`}>
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