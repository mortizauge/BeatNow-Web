// src/components/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/Logo.png';
import rect from '../assets/Rectangle 58.png';
import './Upload.css';
import Select from 'react-select'

function Upload() {
    const options = [
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
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#494949',
            dropdownIndicator: '#FF0000',
            group: '#FF0000',
            groupHeading: '#FF0000',



        })
    }
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
                            <img className={"drop-beat-png"} src={rect} alt="Drop Beat"/>
                            <h1 className="centered-text">Click or drag here to<br/>upload your <b>beat</b></h1>
                            <h5 className="lower-centered-text">Supported formats:<br/>.wav, .mp3, .flac</h5>
                        </div>
                    </section>

                    <section className="beat-info">
                        <form className="login-form">
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
                            <div className="select-container">
                                <Select
                                    className={"select"}
                                    options={options}
                                    isSearchable={true}
                                    isMulti={true}
                                    placeholder="Instruments"
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            borderRadius: 20,
                                            boxShadow: "none",
                                            border: "none",
                                            radius: 20,
                                            backgroundColor: "494949",
                                            width: "100%"
                                        }),
                                        menuList: (base) => ({
                                            ...base,

                                            "::-webkit-scrollbar": {
                                                width: "10px",
                                                height: "0px"
                                            },
                                            "::-webkit-scrollbar-track": {
                                                background: ""
                                            },
                                            "::-webkit-scrollbar-thumb": {
                                                background: "#888"
                                            },
                                            "::-webkit-scrollbar-thumb:hover": {
                                                background: "#555"
                                            }
                                        })
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 20,
                                        colors: {
                                            ...theme.colors,
                                            text: 'black',
                                            primary25: 'black',
                                            primary: 'black',
                                            background: "494949",
                                            neutral0: '#494949',
                                        },
                                    })}
                                />
                            </div>
                                <input
                                    type="text"
                                    placeholder="BPM"
                                />
                                <input
                                    type="text"
                                    placeholder="Tags"
                                />

                        </form>
                    </section>
                    <section className="caption-and-button">
                        <form className="login-form">
                            <textarea className={"caption"}
                                placeholder="Add a caption or a description for this beat..."
                            />
                            <Link className={"upload-btn"} to={"/"}>Upload</Link>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Upload;
