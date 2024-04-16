// src/components/LoginPage.tsx

import React, { useState } from 'react';
import './LoginPage.css';
import logo from "../assets/Logo.png";
import logo2 from "../assets/Frame 2.png";
import {Link} from "react-router-dom";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div className={"app"}>
            <header>
                <Link className="logo" to={"/"}>
                    <img className="logoPng" src={logo} alt="Logo"/>
                </Link>
                <Link className={"buttonSignUp"} to="/register">Sign up</Link>
            </header>
            <div className={"centerDiv"}>
                <main>
                    <section className="logoSect">
                        <img className="logoPngCenter" src={logo2} alt="Logo"/>
                    </section>

                    <div className="dividerVert"></div>

                    <section className="loginContent">
                        <h2>Welcome back!</h2>
                        <p>Please sign into your account</p>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Username"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                            />
                            <Link className={"forgotPwd"} to={"/forgot"}>Forgot password?</Link>
                            <input type="submit" value="Sign in"/>
                            <div className={"dividerHori"}></div>
                            <div className={"socials"}>
                                <Link className={"googleSignIn"} to={"/google"}>
                                    <img className={"googleLogo"} src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google"/>
                                </Link>
                                <Link className={"twitterSignIn"} to={"/x"}>
                                    <img className={"twitterLogo"} src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png" alt="Twitter"/>
                                </Link>
                            </div>
                            <div className={"signUpText"}>
                                <h6>Don't have an account? <br/> <Link className={"signUp"} to={"/register"}>Sign up</Link></h6>
                            </div>

                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default LoginPage;