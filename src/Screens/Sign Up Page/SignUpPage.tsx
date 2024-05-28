import React, {useState, ChangeEvent, FormEvent, FocusEvent, useEffect} from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/Logo.png";
import logo2 from "../../assets/Frame 2.png";
import  signInOrRegisterWithGoogle  from "../../Screens/Login Page/LoginPage";
import CustomPopup from "../../components/Popup/CustomPopup";
import Header from "../../Layout/Header/Header";
import LoginPage from "../../Screens/Login Page/LoginPage";
import {useNavigate} from "react-router-dom";
import VerifyPopup from "../../components/VerifyPopup/VerifyPopup";
import LoadingPopup from "../../components/Loading/Loading";

const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;

function SignUpPage() {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [showVerify, setShowVerify] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [full_name, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [is_active, setIsActive] = useState('false');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState(true);

    const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };


    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        setUsernameAvailable(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    const checkEmailAvailability = async (email: string) => {
        if (!email) {
            return true;
        }
        try {
            const response_email = await axios.get('http://217.182.70.161:6969/v1/api/users/check-email', {
                params: { email }
            });
            return response_email.data.status === "ok";
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const checkUsernameAvailability = async (username: string) => {
        if (!username) {
            return true;
        }
        try {
            const response_username = await axios.get('http://217.182.70.161:6969/v1/api/users/check-username', {
                params: { username }
            });
            return response_username.data.status === "ok";
        } catch (error) {
            console.error('Error checking username:', error);
            return false;
        }
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailAvailable(true);
    };

    const handleEmailBlur = async (event: FocusEvent<HTMLInputElement>) => {
        const email = event.target.value;
        if (email) {
            const isAvailable = await checkEmailAvailability(email);
            setEmailAvailable(isAvailable);
            if (!isAvailable) {
                setMessage('This email is already registered.');
                setShowPopup(true);
            }
        }
    };

    const handleUsernameBlur = async (event: FocusEvent<HTMLInputElement>) => {
        const username = event.target.value;
        if (username) {
            const isAvailable = await checkUsernameAvailability(username);
            setUsernameAvailable(isAvailable);
            if (!isAvailable) {
                setMessage('This username is already taken.');
                setShowPopup(true);
            }
        }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const getToken = async () => {
        try {
            const response = await axios.post(
                'http://217.182.70.161:6969/token',
                new URLSearchParams({
                    grant_type: '',
                    username: username,
                    password: password,
                    scope: '',
                    client_id: '',
                    client_secret: ''
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'accept': 'application/json'
                    }
                }
            );
            return response.data.access_token;
        } catch (error) {
            console.error('Error obtaining token:', error);
            return null;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowLoading(true);
        console.log(token);

        let message = '';
        if (full_name === '' || full_name.length > 40) {
            message = 'Please enter a full name (max 40 characters).';
        } else if (username === '' || username.length > 16 || /\s/.test(username)) {
            message = 'Username must be less than 16 characters and contain no spaces.';
        } else if (email === '' || email.length > 40 || !/\S+@\S+\.\S+/.test(email)) {
            message = 'Please enter a valid email (max 40 characters).';
        } else if (!passwordRequirements.test(password)) {
            message = 'Password must be 8-20 characters and include uppercase, lowercase, number, and special character.';
        } else if (confirmPassword !== password) {
            message = 'Passwords do not match.';
        } else if (!emailAvailable) {
            message = 'This email is already registered.';
        } else if (!usernameAvailable) {
            message = 'This username is already taken.';
        } else {
            try {
                const response = await axios.post('http://217.182.70.161:6969/v1/api/users/register', {
                    full_name,
                    username,
                    email,
                    password,
                    is_active
                });

                console.log(response.data);

                // Obtain token
                setToken(await getToken());

                // Send confirmation email
                try {
                    console.log(token);
                    await axios.post(
                        'http://217.182.70.161:6969/v1/api/mail/send-confirmation/',
                        {},
                        {
                            headers: {
                                'accept': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    );
                    setRegistrationError('');
                    setShowLoading(false);
                    setShowVerify(true);
                    return;
                } catch (emailError) {
                    console.error('Error sending confirmation email:', emailError);
                    setRegistrationError('');
                    setShowLoading(false);
                    setShowVerify(true);
                    return;
                }
            } catch (error) {
                console.error('Error during registration:', error);
                message = 'Registration failed. Please try again.';
            }
        }
        setShowLoading(false);

        setMessage(message);
        setShowPopup(true);
    };

    function notAvailable() {
        setMessage('This feature is not available yet.');
        setShowPopup(true);
    }

    return (
        <div className="app">
            {showPopup && (
                <CustomPopup
                    message={message}
                    onClose={handleClose}
                />
            )}

            {showLoading && (
                <LoadingPopup
                    message={""}
                />
            )}

            {showVerify && (
                <VerifyPopup
                    token={token}/>
            )}
            <Header />
            <div className="centerDiv2">
                <main>
                    <section className="registerContent">
                        <h2>Create New Account</h2>
                        <p>Please fill in the form to continue</p>
                        <form className="register-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={full_name}
                                onChange={handleFullNameChange}
                                placeholder="Full Name"
                                maxLength={40}
                            />
                            <div className="passwordInputs">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onBlur={handleUsernameBlur}
                                    placeholder="Username"
                                    maxLength={16}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    placeholder="Email"
                                    maxLength={40}
                                />
                            </div>
                            <div className="passwordInputs">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    maxLength={20}
                                />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm Password"
                                    maxLength={20}
                                />
                            </div>

                            <button className="submitButton2" type="submit">
                                Sign up
                            </button>

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