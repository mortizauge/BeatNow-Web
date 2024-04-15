// src/components/LoginPage.tsx

import React, { useState } from 'react';
import './LoginPage.css';

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
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default LoginPage;