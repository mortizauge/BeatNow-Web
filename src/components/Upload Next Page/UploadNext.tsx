// src/components/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing Page/LandingPage.css';
import logo from '../../assets/Logo.png';
import rect from '../../assets/Rectangle 58.png';
import './UploadNext.css';
import Select from 'react-select'
import GlobalSelect from "../Global Components/GlobalSelect";

function UploadNext() {
    const instruments = [
        { value: 'guitar', label: 'Guitar' },
        { value: 'bass', label: 'Bass' },
        { value: 'flute', label: 'Flute' },
        { value: 'drums', label: 'Drums' },
        { value: 'piano', label: 'Piano' },
        { value: 'synth', label: 'Synth' },
        { value: 'vocals', label: 'Vocals' },
        { value: 'strings', label: 'Strings' },
        { value: 'brass', label: 'Brass' },
        { value: 'harp', label: 'Harp'}
    ]
    const tags = [
        { label: '#KanyeTypeBeat', value: 'KanyeTypeBeat' },
        { label: '#UKdrill', value: 'UKdrill' },
        { label: '#2024BeatNowFest', value: '2024BeatNowFest' },
        { label: '#90sHipHop', value: '90sHipHop' }
    ]

    console.log(localStorage.getItem("beat"));
    return (
        <div className="app">
            <header>
                <Link className="logo" to={"/"}>
                    <img className="logoPng" src={logo} alt="Logo"/>
                </Link>
                <Link className={"buttonSignUp"} to="/register">Sign up</Link>
            </header>

            <div className="centerDiv">
                <main>
                    <section className="next-drop-beat">
                        <form className="next-info-form">
                            <input
                                type="text"
                                placeholder="Title"
                            />
                            <input
                                type="text"
                                value={"@your_account"}
                            />
                            <input
                                type="text"
                                placeholder="Genre"
                            />
                            <input
                                type="text"
                                placeholder="BPM"
                            />

                        </form>
                    </section>

                    <section className="next-caption-and-button">
                        <form className="next-login-form">
                            <textarea className={"next-caption"} spellCheck={false}
                                      placeholder="Add a caption or a description for this beat..."
                            />
                            <Link className={"upload-btn"} to={"/UploadNext"}>Upload</Link>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default UploadNext;
