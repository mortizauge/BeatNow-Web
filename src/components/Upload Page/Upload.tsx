// src/components/Upload.tsx

import React, {useEffect, useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';

import '../Landing Page/LandingPage.css';
import logo from '../../assets/Logo.png';
import rightarrow from '../../assets/siguiente-pista.png';
import rect from '../../assets/Rectangle 58.png';
import './Upload.css';
import Select from 'react-select'
import GlobalSelect from "../Global Components/GlobalSelect";
import axios, {AxiosResponse} from "axios";
import CustomPopup from '../Popup/CustomPopup';
import { createRealTimeBpmProcessor, getBiquadFilter } from 'realtime-bpm-analyzer';



function Upload(...props: any) {
    const [dragging, setDragging] = useState(false);
    const [username, setUsername] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [tokenExists, setTokenExists] = useState<boolean>(true); // Track if token exists
    const [bpm, setBpm] = useState<number | null>(null); // State to store the detected BPM
    const [formValid, setFormValid] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setTokenExists(false);
            setShowPopup(true); // Show popup if token is null
        } else {
            getUserInfo(token);
        }
    }, []);


    async function getUserInfo(token: string): Promise<any> {
        const url = 'http://217.182.70.161:6969/v1/api/users/users/me';
        const headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}` // Corrected string interpolation
        };

        try {
            const response: AxiosResponse = await axios.get(url, { headers });
            if (response.status === 200) {
                setUsername(response.data.username);
                console.log('Información del usuario:', response.data);
            }
        } catch (error) {
            console.error('Error al obtener la información del usuario.');
        }
    }


    // Referencia al elemento de entrada del archivo
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Controlador de eventos para el clic en el contenedor de la imagen
    const onImageContainerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Controlador de eventos para el cambio en el elemento de entrada del archivo
    const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && !['audio/wav', 'audio/mpeg', 'audio/flac'].includes(file.type)) {
            setShowPopup(true);
        } else if (file) { // Add this check
            setSelectedFile(file);

            // Create an AudioContext
            const audioContext = new (window.AudioContext || window.AudioContext)();
            const lowpass = getBiquadFilter(audioContext);

            // Create a RealTimeBpmProcessor
            const realtimeAnalyzerNode = await createRealTimeBpmProcessor(audioContext);

            // Load the audio file
            const reader = new FileReader();
            reader.onload = function(e) {

                // check if file was loaded
                if (!e.target) {
                    console.error('Error al cargar el archivo.');
                }
                const arrayBuffer = e.target?.result;
                if (arrayBuffer instanceof ArrayBuffer) {
                    audioContext.decodeAudioData(arrayBuffer, function(buffer) {
                        // Create a buffer source
                        const source = audioContext.createBufferSource();
                        source.buffer = buffer;

                        source.connect(lowpass).connect(realtimeAnalyzerNode);

                        // Connect the source to the RealTimeBpmProcessor
                        source.connect(realtimeAnalyzerNode);

                        // Start the source
                        source.start();

                        // Process the audio data to calculate the BPM
                        realtimeAnalyzerNode.port.onmessage = (event) => {
                            if (event.data.message === 'BPM_STABLE') {
                                console.log('BPM_STABLE', event.data.data.bpm);
                            }
                        }
                    });
                }
            };
            reader.readAsArrayBuffer(file); // file is guaranteed to be non-null here
        }
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
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
        if (file && !['audio/wav', 'audio/mpeg', 'audio/flac'].includes(file.type)) {
            setShowPopup(true);
        } else {
            setSelectedFile(file);
        }
    };



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
            {showPopup && (
                <CustomPopup
                    message={tokenExists ? "File format not supported. Please upload a .wav, .mp3, or .flac file." : "Session expired. You will be redirected to the login page."}
                    onClose={() => setShowPopup(false)}
                />
            )}
            <header>
                <Link className="logo" to={"/"}>
                    <img className="logoPng" src={logo} alt="Logo"/>
                </Link>
                <Link className={"buttonSignUp"} to="/register">Sign up</Link>
            </header>

            <div className="centerDiv">
                <main>
                    <section className="drop-beat dragging-parent">
                        <div
                            className={`image-container ${selectedFile ? 'file-selected' : ''} ${dragging ? 'dragging' : ''}`}
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
                                accept=".wav,.mp3,.flac"
                                onChange={onFileInputChange}
                            />
                            {selectedFile ? (
                                <>
                                    <h1 className="centered-text">{selectedFile.name}</h1>
                                    <h5 className="lower-centered-text">Click here to change the file</h5>
                                </>
                            ) : (
                                <>
                                    <h1 className="centered-text">Click or drag here to<br/>upload your <b>beat</b></h1>
                                    <h5 className="lower-centered-text">Supported formats:<br/>.wav, .mp3, .flac</h5>
                                </>
                            )}
                        </div>
                    </section>

                    <section className="beat-info">
                        <form className="info-form">

                            {selectedFile ? (
                                <input
                                    type="text"
                                    placeholder={selectedFile.name}
                                />
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Title"
                                />
                            )}
                            <input
                                type="text"
                                placeholder={username}
                                defaultValue={username}
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

                            <Link className={"next-btn"} to={"/uploadnext"}>
                                <img className={"next-btn-img"} src={rightarrow} alt="Next"/>
                            </Link>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Upload;
