import React from 'react';
import './CustomPopup.css';

interface CustomPopupProps {
    message: string;
    onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ message, onClose }) => {
    return (
        <div className="custom-popup">
            <div className="custom-popup-content">
                <button className="closeBtn" onClick={onClose}>Close</button>
                <h5>{message}</h5>
            </div>
        </div>
    );
};

export default CustomPopup;