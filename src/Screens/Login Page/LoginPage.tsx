// src/components/LoginPage.tsx

import React, {useState} from 'react';
import './LoginPage.css';
import logo from "../../assets/Logo.png";
import logo2 from "../../assets/Frame 2.png";
import {Link} from "react-router-dom";
import Upload from "../UploadScreens/Upload1/Upload";
import {useNavigate} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import CustomPopup from "../../components/Popup/CustomPopup";
import UserSingleton from "../../Model/UserSingleton";


function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false); // Nuevo estado para controlar el popup
    const [message, setMessage] = useState(''); // Nuevo estado para mostrar el mensaje

    interface UserData {
        full_name: string;
        username: string;
        email: string;
        id: string;
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const usr = username;
        const pwd = password;

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
    
                navigateToUpload(token);
                return data;
            }
        } catch (error: any) {
            if (error.response) {
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


    return (
        <div className={"app"}>
            {showPopup && (
                <CustomPopup
                    message={message}
                    onClose={handleClose}
                />
            )}
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
                            <button className={"submitButton"} type={"submit"}> Sign in</button>
                            <div className={"dividerHori"}></div>
                            <div className={"socials"}>
                                <Link className={"googleSignIn"} to={"/google"}>
                                    <img className={"googleLogo"}
                                         src="https://img.icons8.com/color/48/000000/google-logo.png"
                                         alt="Google"/>
                                </Link>
                                <Link className={"twitterSignIn"} to={"/x"}>
                                    <img className={"twitterLogo"}
                                         src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
                                         alt="Twitter"/>
                                </Link>
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