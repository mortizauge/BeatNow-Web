// src/components/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing Page/LandingPage.css';
import logo from '../../assets/Logo.png';
import rect from '../../assets/Rectangle 58.png';
import './Upload.css';
import Select from 'react-select'
import GlobalSelect from "../Global Components/GlobalSelect";

function Upload(...props: any) {

    const username = props.username;
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
                    <section className="drop-beat">
                        <div className="image-container">
                            <input type="file" id="fileInput" style={{display: 'none'}}/>
                            <h1 className="centered-text">Click or drag here to<br/>upload your <b>beat</b></h1>
                            <h5 className="lower-centered-text">Supported formats:<br/>.wav, .mp3, .flac</h5>
                        </div>
                    </section>

                    <section className="beat-info">
                        <form className="info-form">
                            <input
                                type="text"
                                placeholder="Title"
                            />
                            <input
                                type="text"
                                value={username}
                            />
                            <input
                                type="text"
                                placeholder="Genre"
                            />
                            <div className="select-container">
                                <GlobalSelect
                                    options={instruments}
                                    isSearchable={true}
                                    isMulti={true}
                                    placeholder="Instruments"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="BPM"
                            />
                            <div className="select-container">
                                <GlobalSelect
                                    options={tags}
                                    isSearchable={true}
                                    isMulti={true}
                                    placeholder="#Tags"
                                />
                            </div>

                        </form>
                    </section>
                    <section className="caption-and-button">
                        <form className="login-form">
                            <textarea className={"caption"} spellCheck={false}
                                      placeholder="Add a caption or a description for this beat..."
                            />
                            <Link className={"next-btn"} to={"/uploadnext"}>Next</Link>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Upload;
