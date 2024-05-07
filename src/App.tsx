// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login Page/LoginPage';
import Landing from "./components/Landing Page/LandingPage";
import SignUpPage from "./components/Sign Up Page/SignUpPage";
import './App.css';
import Upload from "./components/Upload Page/Upload";
import UploadNext from "./components/Upload Next Page/UploadNext";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="*" element={<Landing />} />
                <Route path="/Upload" element={<Upload />} />
                <Route path={"/UploadNext"} element={<UploadNext/>} />
            </Routes>
        </Router>
    );
}

export default App;