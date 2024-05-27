// src/components/LoginPage.tsx

import React, {useEffect, useState} from 'react';
import './LoginPage.css';
import logo from "../../assets/Logo.png";
import logo2 from "../../assets/Frame 2.png";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import CustomPopup from "../../components/Popup/CustomPopup";
import UserSingleton from "../../Model/UserSingleton";
import Header from "../../Layout/Header/Header";
import {signInOrRegisterWithGoogle} from "../../Model/firebaseConfig";
import LoadingPopup from "../../components/Loading/Loading";
import VerifyPopup from "../../components/VerifyPopup/VerifyPopup";


function LoginPage() {
    const navigate = useNavigate();
    const [showVerifyPopup, setShowVerifyPopup] = useState(false);
    const [loading, setLoading] = useState(false); // Nuevo estado para controlar el popup de carga
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false); // Nuevo estado para controlar el popup
    const [message, setMessage] = useState(''); // Nuevo estado para mostrar el mensaje


    interface UserData {
        full_name: string;
        username: string;
        email: string;
        id: string;
        is_active: boolean;
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmitWithParams = async (usr: string, pwd: string) => {

        try {
            const formData = new URLSearchParams();
            formData.append('username', usr);
            formData.append('password', pwd);

            const response = await fetch('http://217.182.70.161:6969/v1/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });
            setLoading(false); // Oculta el popup de carga
            if (response.ok) {
                await token(usr, pwd);
            } else {
                let message = '';
                if (username === '' || password === '') {
                    message = 'Please fill in all fields.';
                }
                else if (response.status <= 400 && response.status < 500) {
                    message = 'Invalid username or password.';
                }
                else if (response.status <= 500 && response.status < 600) {
                    message = 'Server error. Please try again later.';
                }
                else {
                    message = 'An unknown error occurred.';
                }
                setMessage(message);
                setShowPopup(true);
            }
        } catch (error) {
            setMessage('Network error. Please check your connection.');
            setShowPopup(true);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true); // Muestra el popup de carga
        await handleSubmitWithParams(username, password);
    };


    async function token(usr: string, password: string) {
        try {
            const formData = new URLSearchParams();
            formData.append('username', usr);
            formData.append('password', password);

            // Llamar a la API de inicio de sesión con los datos del usuario
            const response = await fetch('http://217.182.70.161:6969/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Cambiar el tipo de contenido
                },
                body: formData // Usar los datos convertidos
            });

            // Verificar el estado de la respuesta
            if (response.ok) {
                const data = await response.json();
                // El inicio de sesión fue exitoso
                localStorage.setItem('token', data.access_token);
                console.log(data.access_token);
                await getUserInfo();
                if (!UserSingleton.getInstance().getIsActive()) {
                    setShowVerifyPopup(true);
                }
                else {
                    navigateToUpload(data.access_token);
                }
            } else {
                // El inicio de sesión falló
                // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
            }
        } catch (error) {
            // Manejar errores de red u otros errores
        }
    }

    async function getUserInfo(): Promise<UserData | void> {
        const url = 'http://217.182.70.161:6969/v1/api/users/users/me';
        const token = localStorage.getItem('token');
        const headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response: AxiosResponse<UserData> = await axios.get<UserData>(url, { headers });
            if (response.status === 200) {
                const data = response.data;
                const user = UserSingleton.getInstance();
                user.setFullName(data.full_name);
                user.setUsername(data.username);
                user.setEmail(data.email);
                user.setId(data.id);
                user.setIsActive(data.is_active);

                // navigateToUpload(token);
                return data;
            }
        } catch (error: any) {
            if (error.response) {
                setMessage("Error: " + error.response.detail.toString());
                setShowPopup(true);
                console.error('Error al obtener la información del usuario:', error.response.data);
            } else {
                console.error('Error al obtener la información del usuario:', error.message);
            }
            throw new Error('No se pudo obtener la información del usuario');
        }
    }

    function navigateToUpload(token: string | null) {
        navigate('/Dashboard', {state: {token}});
    }

    const handleClose = () => {
        setShowPopup(false); // Cerrar el popup
    };


    function notAvailable() {
        setMessage('This feature is not available yet.');
        setShowPopup(true);
    }

    return (
        <div className={"app"}>
            {showPopup && (
                <CustomPopup
                    message={message}
                    onClose={handleClose}
                />
            )}

            {loading && (
                <LoadingPopup
                    message={""}
                />
            )}

            {showVerifyPopup && (
                <VerifyPopup />
            )}

            <Header />

            <div className={"centerDiv-Login"}>
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
                            <Link className={"forgotPwd"} to={"/forgotPwd"}>Forgot password?</Link>
                            <button className={"submitButton"} type={"submit"}> Sign in</button>
                            <div className={"dividerHori"}></div>
                            <div className={"socials"}>
                                <button className={"googleSignIn"} onClick={signInOrRegisterWithGoogle} type={"button"}>
                                    <img className={"googleLogo"}
                                         src="https://img.icons8.com/color/48/000000/google-logo.png"
                                         alt="Google"/>
                                </button>
                                <button className={"twitterSignIn"} onClick={notAvailable} type={"button"}>
                                    <img className={"twitterLogo"}
                                         src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
                                         alt="Twitter"/>
                                </button>
                            </div>
                            <div className={"signUpText"}>
                                <h6>Don't have an account? <br/> <Link className={"signUp"} to={"/register"}>Sign
                                    up</Link></h6>
                            </div>

                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}


export default LoginPage;