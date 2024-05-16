import React, { useState, ChangeEvent, FormEvent } from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/Logo.png";
import logo2 from "../../assets/Frame 2.png";

function SignUpPage() {
    const [full_name, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://217.182.70.161:6969/v1/api/users/register', {
                full_name,
                username,
                email,
                password
            });
            console.log(response.data);
            // Handle successful registration
            setRegistrationError('');
            // Redirect to login page
            window.location.href = "/login";
        } catch (error) {
            console.error('Error during registration:', error);
            setRegistrationError('Registration failed. Please try again.'); // Set error message
        }
    };

    return (
        <div className="app">
            <header>
                <Link className="logo" to={"/"}>
                    <img className="logoPng" src={logo} alt="Logo"/>
                </Link>
                <Link className={"buttonSignUp"} to="/register">Sign up</Link>
            </header>
            <div className="centerDiv2">
                <main>
                    <section className="registerContent">
                        <h2>Create New Account</h2>
                        <p>Please fill in the form to continue</p>
                        <form className="register-form" onSubmit={handleSubmit}>
                            <input
                                type="flex"
                                value={full_name}
                                onChange={handleFullNameChange}
                                placeholder="Full Name"
                            />
                            <div className="passwordInputs">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="Username"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="passwordInputs">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <button className="submitButton2" type="submit">
                                Sign up
                            </button>

                            <div className={"dividerHori2"}></div>
                            <div className={"socials"}>
                                <Link className={"googleSignUp"} to={"/google"}>
                                    <img className={"googleLogo"}
                                         src="https://img.icons8.com/color/48/000000/google-logo.png"
                                         alt="Google"/>
                                </Link>
                                <Link className={"twitterSignUp"} to={"/x"}>
                                    <img className={"twitterLogo"}
                                         src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
                                         alt="Twitter"/>
                                </Link>
                            </div>
                            <div className="signUpText">
                                <h6>
                                    Already have an account?{' '}
                                    <Link className="signIn" to="/login">
                                        Sign in
                                    </Link>
                                </h6>
                            </div>
                        </form>
                        {registrationError && <div className="error">{registrationError}</div>}
                    </section>

                    <div className="dividerVert2"></div>
                    <section className="logoSect2">
                        <img className="logoPngCenter2" src={logo2} alt="Logo"/>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default SignUpPage;
