import React, { useEffect, useState } from 'react';
import VerificationInput from 'react-verification-input';
import './VerifyPopup.css';
import {useNavigate} from 'react-router-dom';

interface VerifyPopupProps {
    token: string;
}

const VerifyPopup: React.FC<VerifyPopupProps> = ({token}) =>{
    const navigate = useNavigate();
    const [validToken, setValidToken] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (token) {
            setValidToken(token);
        }
    }, []);


    const handleClose = () => {
        setIsVisible(false);
    };

    const handleInputChange = (code: string) => {
        setVerificationCode(code);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(verificationCode);

        const token = validToken || localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch(`http://217.182.70.161:6969/v1/api/mail/confirmation/?code=${verificationCode}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({}),
            });
            console.log(token.toString());

            if (response.ok) {
                console.log('Code verified successfully');
                handleClose();
                navigate('/Dashboard', {state: {token}});
                // Handle success if needed
            } else {
                console.error('Failed to verify code');
                console.error(await response.json());
            }
        } catch (error) {
            console.error('Error verifying code:', error);
        }
    };

    const resendCode = async () => {
        const token = validToken || localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch('http://217.182.70.161:6969/v1/api/mail/send-confirmation/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                console.log('Code resent successfully');
                console.log(await response.json());
                // Handle success if needed
            } else {
                console.error('Failed to resend code');
                // Handle failure if needed
            }
        } catch (error) {
            console.error('Error resending code:', error);
        }
    };

    return (
        <div className={`verify-popup ${isVisible ? 'visible' : ''}`}>
            <div className="verify-popup-content">
                <form className={"verification-form"} onSubmit={handleSubmit}>
                    <div className={"verification-texts"}>
                        <h3>A verification code has been sent</h3>
                        <br/>
                        <h5>Please check your email and input your code to complete registration: </h5>
                    </div>
                    <div className={"verification-inputs"}>
                        <VerificationInput
                            length={6}
                            placeholder={""}
                            autoFocus
                            validChars={"0-9"}
                            onChange={handleInputChange}
                            value={verificationCode}
                        />
                    </div>
                    <button className={"resend-button"} type={"button"} onClick={resendCode}>Resend code</button>
                    <button className="submit-verify" type={"submit"}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPopup;
