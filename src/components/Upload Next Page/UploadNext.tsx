// src/components/LandingPage.tsx

import React, { useRef, useState } from 'react';
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

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onImageContainerClick = () => {
        fileInputRef.current?.click();
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
        setSelectedFile(file);
    };

    const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    };


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
                    <section className="next-caption-and-button">
                            <textarea className={"next-caption"} spellCheck={false}
                                placeholder="Add a caption or a description for this beat..."
                            />
                    </section>
                    <section className="next-drop-pic dragging-parent">
                        <form className={"next-form"}>
                            <div
                            className={`next-image-container ${selectedFile ? 'file-selected' : ''} ${dragging ? 'dragging' : ''}`}
                            onClick={onImageContainerClick}
                            onDragOver={onDragOver}
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <input
                                type="file"
                                id="fileInput"
                                ref={fileInputRef}
                                style={{display: 'none'}}
                                accept="image/*"
                                onChange={onFileInputChange}
                            />
                            {selectedFile ? (
                                <>
                                    <img src={URL.createObjectURL(selectedFile)} alt="Selected"
                                         className="selected-image"/>
                                    <h5 className="lower-centered-text">Click here to change the file</h5>
                                </>
                            ) : (
                                <>
                                    <h1 className="centered-text">Upload your cover art here</h1>
                                    <h5 className="lower-centered-text">Supported formats: .jpg, .png, .gif, etc.
                                    </h5>
                                </>
                            )}
                        </div>
                            <button className={"upload-btn"}><b>Upload Beat</b></button>
                        </form>
                    </section>

                </main>
            </div>
        </div>
    );
}

export default UploadNext;
