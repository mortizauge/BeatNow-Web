import React, { useEffect, useState } from 'react';
import './CustomPopup.css';

interface CustomPopupProps {
    message: string;
    onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 500); // Espera la duración de la animación antes de cerrar
    };

    return (
        <div className={`custom-popup ${isVisible ? 'visible' : ''}`}>
            <div className="custom-popup-content">
                <button className="closeBtn" onClick={handleClose}>Close</button>
                <h5>{message}</h5>
            </div>
        </div>
    );
};

export default CustomPopup;