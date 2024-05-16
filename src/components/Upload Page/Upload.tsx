// src/components/Upload.tsx

import React, {FormEvent, useEffect, useState} from 'react';

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
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import { TagsInput } from 'react-tag-input-component';

interface Beat {
    beatTitle: string;
    beatUsername: string;
    beatGenre: string;
    beatInstruments: string[];
    beatTags: string[];
    beatBpm: number;
    beatFile: File | null;
}

function Upload() {
    // Estados para los campos del formulario
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [instruments, setInstruments] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [bpmValue, setBpmValue] = useState("");
    const [dragging, setDragging] = useState(false);
    const [username, setUsername] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [tokenExists, setTokenExists] = useState<boolean>(true);
    const [bpm, setBpm] = useState<number | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [noCopyrightInfringement, setNoCopyrightInfringement] = useState(false);
    const [validFile, setValidFile] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");
    const [selected, setSelected] = useState([]);
    const [beat, setBeat] = useState<Beat>({
        beatTitle: "",
        beatUsername: "",
        beatGenre: "",
        beatInstruments: [],
        beatTags: [],
        beatBpm: 0,
        beatFile: null,
    });



    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || !tokenExists) {
            setTokenExists(false);
            setMessage("Session has expired, redirecting to login page");
            setShowPopup(true);
            return;
        }

        const url = "http://217.182.70.161:6969/v1/api/users/users/me";
        const headers = {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        };
        axios
            .get(url, { headers })
            .then((response) => {
                if (response.status === 200) {
                    setUsername(response.data.username);
                    console.log("Información del usuario:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error al obtener la información del usuario.");
                setTokenExists(false);
                setShowPopup(true);
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    useEffect(() => {
        if (submitted) {
            console.log(beat);
            // save beat to local storage
            localStorage.setItem("beat", JSON.stringify(beat));
            navigate("/uploadnext");
        }
    }, [beat, submitted, navigate]);

    useEffect(() => {
        if (selectedFile) {
            // Lógica que depende del archivo seleccionado
            console.log(selectedFile);
        }
    }, [selectedFile]);



    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // print all fields to console
        console.log(title);
        console.log(username);
        console.log(genre);
        console.log(instruments);
        console.log(tags);
        console.log(bpmValue);
        console.log(selectedFile);


        // Comprobaciones de los campos
        if (!title || !username || !genre || instruments.length === 0 || tags.length === 0 || !bpmValue) {
            setMessage("Please fill in all fields.");
            setShowPopup(true);
            return;
        }
        else if (!selectedFile) {
            setMessage("Please upload a file.");
            setShowPopup(true);
            return;
        }

        if (!termsAccepted || !noCopyrightInfringement) {
            setMessage("Please accept the terms and conditions and confirm that you are not uploading copyrighted content");
            setShowPopup(true);
            setSubmitted(false);
            return;
        } else {
            // Actualizar el estado del beat
            setBeat({
                beatTitle: title,
                beatUsername: username,
                beatGenre: genre,
                beatInstruments: instruments,
                beatTags: tags,
                beatBpm: bpmValue,
                beatFile: selectedFile,
            });
            setSubmitted(true);
        }
    };


    const handleClose = () => {
        const token = localStorage.getItem("token");
        if (!token || !tokenExists) {
            //navigate("/login");
        }
        setShowPopup(false);
    };



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
            setValidFile(false);
            setMessage("File format not supported. Please upload a .wav, .mp3, or .flac file");
            setShowPopup(true);

        } else {
            setValidFile(true);
            setSelectedFile(file);
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
            setValidFile(false);
            setMessage("File format not supported. Please upload a .wav, .mp3, or .flac file");
            setShowPopup(true);
        } else {
            setValidFile(true);
            setSelectedFile(file);
        }
    };

    const handleTagsChange = (tags: string[]) => {
        // Prepend '#' to each tag
        const updatedTags = tags.map(tag => tag.startsWith('#') ? tag : `#${tag}`);
        setTags(updatedTags);
    };

    const beforeAddTagsInput = (tag: string, existingTags: string[]) => {
        // verify if tag is already in the list taking '#' into account
        const tagExists = existingTags.includes(tag) || existingTags.includes(`#${tag}`);
        return !tagExists;
    };




    const instrumentsList = [
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
    const moodsList = [
        { value: 'happy', label: 'Happy' },
        { value: 'sad', label: 'Sad' },
        { value: 'aggressive', label: 'Aggressive' },
        { value: 'calm', label: 'Calm' },
        { value: 'energetic', label: 'Energetic' },
        { value: 'relaxed', label: 'Relaxed' },
        { value: 'excited', label: 'Excited' },
        { value: 'melancholic', label: 'Melancholic' },
        { value: 'romantic', label: 'Romantic' },
        { value: 'nostalgic', label: 'Nostalgic' }
    ]
    const genresList = [
        { value: 'trap', label: 'Trap' },
        { value: 'hiphop', label: 'Hip-Hop' },
        { value: 'pop', label: 'Pop' },
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'reggae', label: 'Reggae' },
        { value: 'rnb', label: 'R&B' },
        { value: 'country', label: 'Country' },
        { value: 'blues', label: 'Blues' },
        { value: 'metal', label: 'Metal' }
    ]

    return (

        <div className="app">
            {showPopup && (
                <CustomPopup
                    message={message}
                    onClose={handleClose}
                />
            )}
            <header>
                <Link className="logo" to={"/"}>
                    <img className="logoPng" src={logo} alt="Logo"/>
                </Link>
                <Link to={"/uploadnext"}>uploadnext</Link>

                <Link className={"userBtn"} to="/upload">{username}</Link>
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
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                type="number"
                                max={300}
                                min={1}
                                placeholder="BPM"
                                value={bpmValue}
                                onChange={(e) => setBpmValue(e.target.value)}
                            />
                            <TagsInput
                                value={tags}
                                onChange={handleTagsChange}
                                beforeAddValidate={beforeAddTagsInput}
                                name="tags"
                                placeHolder="#Tags"
                            />
                            <GlobalSelect
                                options={moodsList}
                                isSearchable={true}
                                isMulti={true}
                                placeholder="Mood"
                                onChange={(selected) => setGenre(selected ? selected.value : "")}
                            />
                            <GlobalSelect
                                options={genresList}
                                isSearchable={true}
                                isMulti={false}
                                placeholder="Genres"
                                onChange={(selected) => setGenre(selected ? selected.value : "")}
                            />
                            <GlobalSelect
                                options={instrumentsList}
                                isSearchable={true}
                                isMulti={true}
                                placeholder="Instruments"
                                onChange={(selected) => setInstruments(selected ? selected.map(item => item.value) : [])}
                            />


                        </form>
                    </section>
                    <section className="caption-and-button">
                        <form className="next-form" onSubmit={handleSubmit}>
                            <div className={"checkboxes"}>
                                <div className={"termsCheckbox"}>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        id="terms"
                                        checked={termsAccepted}
                                        onChange={() => setTermsAccepted(!termsAccepted)}
                                    />
                                    <label className="termsTxt">I have read and accept the terms and conditions</label>
                                </div>
                                <div className={"copyrightCheckBox"}>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        id="copyright"
                                        checked={noCopyrightInfringement}
                                        onChange={() => setNoCopyrightInfringement(!noCopyrightInfringement)}
                                    />
                                    <label className="copyrightTxt">I confirm that I am not uploading copyrighted
                                        content</label>
                                </div>

                            </div>
                            <button className={"next-btn"} type="submit">
                                <img className={"next-btn-img"} src={rightarrow} alt="Next"/>
                            </button>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Upload;
