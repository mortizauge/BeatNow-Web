import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import React, { useState } from "react";
import UserSingleton from "../../Model/UserSingleton";
import "./Header.css";

function Header() {
    const user = UserSingleton.getInstance();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img className="logoPng" src={logo} alt="Logo"/>
                </Link>
            </div>
            <div className="nav-links">
                {localStorage.getItem("token") === null ? (
                    <Link className="buttonSignUp" to="/register">Sign up</Link>
                ) : (
                    <div className="profile" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img src={user.photoProfile} alt="Profile"/>
                        {dropdownOpen && (
                            <div className="dropdown-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <Link to="/profile">Perfil</Link>
                                <Link to="/settings">Ajustes</Link>
                                <Link to="/logout">Cerrar sesión</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;