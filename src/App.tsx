// src/App.tsx

// APIS: http://217.182.70.161:6969/docs#/

import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './Screens/Login Page/LoginPage';
import Landing from "./Screens/Landing Page/LandingPage";
import SignUpPage from "./Screens/Sign Up Page/SignUpPage";
import './App.css';
import Upload from "./Screens/UploadScreens/Upload";
import UploadNext from "./Screens/UploadScreens/Upload2/UploadNext";
import Dashboard from "./Screens/DashboardPage/Dashboard";
import CustomPopup from './components/Popup/CustomPopup';
import ForgotPwdPage from "./Screens/ForgotPwd Page/ForgotPwdPage";

const CheckToken = () => {
    const timeout = 3000;
    const location = useLocation();
    const [showPopup, setShowPopup] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const logout = () => {
        localStorage.removeItem("token");
        setShowPopup(true);
    }

    const checkToken = () => {
        intervalRef.current = window.setInterval(() => {
            if (localStorage.getItem("token") === null) {
                logout();
            }
        }, timeout);
    }

    useEffect(() => {
        if (location.pathname !== "/" &&
            location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            location.pathname !== "/forgotPwd") {
            checkToken();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [location]);

    return (
        <>
            {showPopup && <CustomPopup message="Session has expired, redirecting to landing page." onClose={() => window.location.href = "/"} />}
        </>
    );
}

function App() {
    return (
        <Router>
            <CheckToken />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="*" element={<Landing />} />
                <Route path="/Upload" element={<Upload />} />
                <Route path={"/Dashboard"} element={<Dashboard />} />
                <Route path={"/ForgotPwd"} element={<ForgotPwdPage />} />
            </Routes>
        </Router>
    );
}

export default App;