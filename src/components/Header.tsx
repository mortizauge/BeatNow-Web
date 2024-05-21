import {Link} from "react-router-dom";
import logo from "../assets/Logo.png";
import React from "react";

function Header() {
    return (
        <header>
            <Link className="logo" to={"/"}>
            <img className="logoPng" src={logo} alt="Logo"/>
            </Link>
            <Link className={"buttonSignUp"} to="/register">Sign up</Link>
        </header>
    );
}

export default Header;