import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import UserSingleton from "../../Model/UserSingleton";
import CustomPopup from "../../components/Popup/CustomPopup";
import "./Header.css";

function Header() {
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const user = UserSingleton.getInstance();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        if (dropdownOpen) {
            closeDropdown();
        } else {
            setDropdownOpen(true);
        }
    };

    const closeDropdown = () => {
        setClosing(true);
        setTimeout(() => {
            setDropdownOpen(false);
            setClosing(false);
        }, 300); // El tiempo debe coincidir con la duración de la animación de cierre
    };

    const handleLogout = () => {
        closeDropdown();
        localStorage.removeItem("token");
        UserSingleton.getInstance().clear();
        window.location.href = "/";
    };

    const notAvailable = () => {
        setMessage("This feature is not available yet.");
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const token = localStorage.getItem("token");

    return (
        <header className="header">
            <div className="logo">
                {token === null ? (
                    <Link to="/">
                        <img className="logoPng" src={logo} alt="Logo"/>
                    </Link>
                ) : (
                    <Link to="/dashboard">
                        <img className="logoPng" src={logo} alt="Logo"/>
                    </Link>
                )}
            </div>
            {token === null ? (
                <Link className="buttonSignUp" to="/register">Sign up</Link>
            ) : (
                <div className="nav-links">
                    <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
                        <img src={user.photoProfile} alt="Profile"/>
                        {dropdownOpen && (
                            <div className={`dropdown-content ${closing ? 'close' : 'open'}`}>
                                <a onClick={notAvailable}>Perfil</a>
                                <a onClick={notAvailable}>Ajustes</a>
                                <a onClick={handleLogout}>Cerrar sesión</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {showPopup && (
                <CustomPopup message={message} onClose={closePopup} />
            )}
        </header>
    );
}

export default Header;