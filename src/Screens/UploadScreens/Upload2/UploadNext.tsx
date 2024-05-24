// src/components/LandingPage.tsx

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Landing Page/LandingPage.css';
import logo from '../../../assets/Logo.png';
import rect from '../../../assets/Rectangle 58.png';
import './UploadNext.css';
import Select from 'react-select'
import GlobalSelect from "../../../components/Select/GlobalSelect";
import CustomPopup from "../../../components/Popup/CustomPopup";
import Header from "../../../Layout/Header/Header";

function UploadNext() {


    return (
        {/*
        <div className="app">
            {showPopup && <CustomPopup
                message={message}
                onClose={handleClose}
            />}
            <Header />

            <div className="centerDiv">
                <main>
                    <section className="next-caption-and-button">
                            <textarea className={"next-caption"} spellCheck={false}
                                placeholder="Add a caption or a description for this beat..."
                            />
                    </section>
                    <section className="next-drop-pic dragging-parent">
                        <form className={"next-form"} onSubmit={handleSumbit2}>
                            <div
                                className={`next-image-container ${selectedFile ? 'file-selected' : ''} ${dragging ? 'dragging' : ''}`}
                                onClick={onImageContainerClick}
                                onDragOver={onDragOver}
                                onDragEnter={onDragEnter}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop2}
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    ref={fileInputRef}
                                    style={{display: 'none'}}
                                    accept="image/*"
                                    onChange={onFileInputChange2}
                                />
                                {selectedFile ? (
                                    <>
                                        <img src={URL.createObjectURL(selectedFile)} alt="Selected"
                                             className="selected-image"/>
                                        <button onClick={removeImage} className="remove-image-button">×</button>
                                        <h5 className={`lower-centered-text ${selectedFile ? 'lower-centered-text-shadow' : ''}`}>Click
                                            here to change the file</h5>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="centered-text">Upload your cover art here</h1>
                                        <h5 className="lower-centered-text">Supported formats: .jpg, .png, .gif, etc.
                                        </h5>
                                    </>
                                )}
                            </div>
                            <button className={"upload-btn"} type={"submit"}><b>Upload Beat</b></button>
                        </form>
                    </section>

                </main>
            </div>
        </div>
        */}
    );
}

export default UploadNext;
