import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import UserSingleton from "../../Model/UserSingleton";
import { motion, Variants } from "framer-motion";
import "./Header.css";

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

function Header() {
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
    }

    return (
        <header className="header">
            <div className="logo">
                {localStorage.getItem("token") === null ? (
                    <Link to="/">
                        <img className="logoPng" src={logo} alt="Logo"/>
                    </Link>
                ) : (
                    <Link to="/dashboard">
                        <img className="logoPng" src={logo} alt="Logo"/>
                    </Link>
                )}
            </div>
            {localStorage.getItem("token") === null ? (
                <Link className="buttonSignUp" to="/register">Sign up</Link>
            ) : (
                <div className="nav-links">
                    <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
                        <img src={user.photoProfile} alt="Profile"/>
                        {dropdownOpen && (
                            <div className={`dropdown-content ${closing ? 'close' : 'open'}`}>
                                <a>Perfil</a>
                                <a>Ajustes</a>
                                <a onClick={handleLogout}>Cerrar sesión</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
