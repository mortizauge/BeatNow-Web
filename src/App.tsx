// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Screens/Login Page/LoginPage';
import Landing from "./Screens/Landing Page/LandingPage";
import SignUpPage from "./Screens/Sign Up Page/SignUpPage";
import './App.css';
import Upload from "./Screens/UploadScreens/Upload";
import UploadNext from "./Screens/UploadScreens/Upload2/UploadNext";
import Dashboard from "./Screens/DashboardPage/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="*" element={<Landing />} />
                <Route path="/Upload" element={<Upload />} />
                <Route path={"/Dashboard"} element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;