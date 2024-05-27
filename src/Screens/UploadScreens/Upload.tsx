// src/components/Upload.tsx

import React, {FormEvent, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Landing Page/LandingPage.css';
import rightarrow from '../../assets/siguiente-pista.png';
import './Upload.css';
import GlobalSelect from "../../components/Select/GlobalSelect";
import axios, {AxiosResponse} from "axios";
import CustomPopup from '../../components/Popup/CustomPopup';
import { TagsInput } from "react-tag-input-component";
import Header from "../../Layout/Header/Header";
import { useTransition, animated } from 'react-spring';
import Select from 'react-select'
import Loading from "../../components/Loading/Loading";
import {useSpring} from "@react-spring/web";


interface Beat {
    beatUsername: string;
    beatFile: File | null;
    beatTitle: string;
    beatBpm: number;
    beatTags: string[];
    beatMoods: string[];
    beatGenre: string;
    beatInstruments: string[];
    beatDescription: string;
    beatPic: File | null;
}

function Upload() {
    const [activePhase, setActivePhase] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const maxBPM = 500;
    // Estados para los campos del formulario
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [instruments, setInstruments] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [bpmValue, setBpmValue] = useState("");
    const [dragging, setDragging] = useState(false);
    const [username, setUsername] = useState("");
    const [selectedMusicFile, setSelectedMusicFile] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [tokenExists, setTokenExists] = useState<boolean>(true);
    const [bpm, setBpm] = useState<number | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [noCopyrightInfringement, setNoCopyrightInfringement] = useState(false);
    const [validFile, setValidFile] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [selected, setSelected] = useState([]);
    const [selectedImgFile, setSelectedImgFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [moods, setMoods] = useState<string[]>([]);
    const [successfulUpload, setSuccessfulUpload] = useState(false);
    const [beat, setBeat] = useState<Beat>({
        beatUsername: "",
        beatFile: null,
        beatTitle: "",
        beatBpm: 0,
        beatTags: [],
        beatMoods: [],
        beatGenre: "",
        beatInstruments: [],
        beatDescription: "",
        beatPic: null
    });

    useEffect(() => {
        const savedGenre = localStorage.getItem("genre");
        const savedMoods = JSON.parse(localStorage.getItem("moods") || "[]");
        const savedInstruments = JSON.parse(localStorage.getItem("instruments") || "[]");

        setGenre(savedGenre || "");
        setMoods(savedMoods);
        setInstruments(savedInstruments);
    }, []);

    const [next, setNext] = useState(false);


    const slideAnimationInitial = useSpring({
        transform: next ? 'translate3d(-100%, 0, 0)' : 'translate3d(0%, 0, 0)',
        config: {
            tension: 210,
            friction: 20
        }
    });

    const slideAnimationNext = useSpring({
        transform: next ? 'translate3d(0%, 0, 0)' : 'translate3d(100%, 0, 0)',
        config: {
            tension: 210,
            friction: 20
        }
    });

    const spring = useSpring({
        to: {
            transform: `translateX(${activeTab * 100}%)`,
        },
    });


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

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
        }
    }, [beat, submitted, navigate]);

    useEffect(() => {
        if (selectedMusicFile) {
            // Lógica que depende del archivo seleccionado
            console.log(selectedMusicFile);
        }
    }, [selectedMusicFile]);

    useEffect(() => {
        setBeat(prevBeat => ({
            ...prevBeat,
            beatDescription: description,
        }));
    }, [description]);



    const handleSubmit1 = (event: FormEvent) => {
        event.preventDefault();

        if (validateForm()) {
            setSubmitted(true);
            setNext(true);
            saveSelectedValues(); // Save selected values before navigating to the next phase
        }
    };
    const handleSubmit2 = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedImgFile === null) {
            setMessage("Please upload a cover image.");
            setShowPopup(true);
        } else {
            setIsLoading(true);
            setLoadingMessage("Uploading beat...");
            setShowLoading(true);
            setBeat({
                beatUsername: username,
                beatFile: selectedMusicFile,
                beatTitle: title,
                beatBpm: parseInt(bpmValue),
                beatTags: tags,
                beatMoods: moods,
                beatGenre: genre,
                beatInstruments: instruments,
                beatDescription: description,
                beatPic: selectedImgFile
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            await uploadBeat();
        }
    };

    async function uploadBeat() {
        setIsLoading(true); // Añade esta línea

        const url = "http://217.182.70.161:6969/v1/api/posts/upload";
        const headers = {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const formData = new FormData();
        formData.append('cover_file', beat.beatPic as Blob);
        formData.append('audio_file', beat.beatFile as Blob);
        formData.append('description', beat.beatDescription);
        formData.append('genre', beat.beatGenre);
        formData.append('tags', JSON.stringify(beat.beatTags));
        formData.append('moods', JSON.stringify(beat.beatMoods));
        formData.append('instruments', JSON.stringify(beat.beatInstruments));
        formData.append('bpm', beat.beatBpm.toString())
        formData.append('title', beat.beatTitle);

        try {
            const response = await axios.post(url, formData, { headers });
            if (response.status === 200) {
                console.log('Beat uploaded successfully.');
                setMessage("Beat uploaded successfully.");
                setShowPopup(true);
                setSuccessfulUpload(true);
            }
        } catch (error) {
            console.error('Error uploading beat:', error);
            setMessage("Error uploading beat. Please try again.");
            setShowPopup(true);
        } finally {
            setIsLoading(false); // Añade esta línea
        }
    }
    const handleClose = () => {
        const token = localStorage.getItem("token");
        if (!token || !tokenExists) {
            //navigate("/login");
        }
        if (successfulUpload) {
            navigate("/Dashboard");
        }
        setShowPopup(false);
    };

    const validateForm = () => {
        // Comprobaciones de los campos
        if (!title || !username || !genre || instruments.length === 0 || tags.length === 0 || !bpmValue) {
            setMessage("Please fill in all fields.");
            setShowPopup(true);
            return false;
        }
        else if (!selectedMusicFile) {
            setMessage("Please upload a file.");
            setShowPopup(true);
            return false;
        }

        if (!termsAccepted || !noCopyrightInfringement) {
            setMessage("Please accept the terms and conditions and confirm that you are not uploading copyrighted content");
            setShowPopup(true);
            return false;
        } else {
            // Actualizar el estado del beat
            setBeat({
                beatUsername: username,
                beatFile: selectedMusicFile,
                beatTitle: title,
                beatBpm: parseInt(bpmValue),
                beatTags: tags,
                beatMoods: moods,
                beatGenre: genre,
                beatInstruments: instruments,
                beatDescription: description,
                beatPic: selectedImgFile
            });
            return true;
        }
    };

    useEffect(() => {
        setBeat(prevBeat => ({
            ...prevBeat,
            beatMoods: moods,
        }));
    }, [moods]);

    useEffect(() => {
        setBeat({
            ...beat,
            beatMoods: moods,
            beatGenre: genre,
            beatInstruments: instruments,
        });
    }, [moods, genre, instruments]);

    useEffect(() => {
        const savedGenre = localStorage.getItem("genre");
        const savedMoods = JSON.parse(localStorage.getItem("moods") || "[]");
        const savedInstruments = JSON.parse(localStorage.getItem("instruments") || "[]");

        setGenre(savedGenre || "");
        setMoods(savedMoods);
        setInstruments(savedInstruments);
    }, []);


    // para debugar el spinner:
    /*
    useEffect( () => {
        setIsLoading(true);
        setShowLoading(true);
    });
     */


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
        fileInputRef.current?.click();
    };

    const removeImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedImgFile(null);
    };

    const saveSelectedValues = () => {
        localStorage.setItem("genre", genre);
        localStorage.setItem("moods", JSON.stringify(moods));
        localStorage.setItem("instruments", JSON.stringify(instruments));
    };

    // Controlador de eventos para el cambio en el elemento de entrada del archivo
    const onFileInputChange1 = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && !['audio/wav', 'audio/mpeg', 'audio/flac'].includes(file.type)) {
            setValidFile(false);
            setMessage("File format not supported. Please upload a .wav, .mp3, or .flac file");
            setShowPopup(true);

        } else {
            setValidFile(true);
            setSelectedMusicFile(file);
        }
    };

    const onFileInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/gif', 'image/jpeg'];
            if (validImageTypes.includes(fileType)) {
                setSelectedImgFile(file);
                setBeat({
                    ...beat,
                    beatPic: file
                });


            } else {
                setMessage("This file format is not supported.");
                setShowPopup(true);
            }
        }
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

    const onDrop1 = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
        if (file && !['audio/wav', 'audio/mpeg', 'audio/flac'].includes(file.type)) {
            setValidFile(false);
            setMessage("File format not supported. Please upload a .wav, .mp3, or .flac file");
            setShowPopup(true);
        } else {
            setValidFile(true);
            setSelectedMusicFile(file);
        }
    };

    const onDrop2 = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
        setSelectedImgFile(file);
    };

    const handleTagsChange = (tags: string[]) => {
        // Prepend '#' to each tag and remove spaces
        const updatedTags = tags.map(tag => tag.startsWith('#') ? tag.replace(/\s/g, '') : `#${tag.replace(/\s/g, '')}`);
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


    function handleDescChange() {
        const description = (document.getElementById("description") as HTMLInputElement).value;
        setDescription(description);
        setBeat({
            ...beat,
            beatDescription: description
        });
    }

    return (
            <div className="app">
                {showPopup && <CustomPopup
                    message={message}
                    onClose={handleClose}/>}

                {isLoading && <Loading message={loadingMessage}/>}
                <Header/>
                {!next ? (
                    <>
                        <main>
                            <animated.div className="centerDiv-Upload" style={slideAnimationInitial}>
                                <section className="drop-beat dragging-parent">
                                    <div
                                        className={`image-container ${selectedMusicFile ? 'file-selected' : ''} ${dragging ? 'dragging' : ''}`}
                                        onClick={onImageContainerClick}
                                        onDragOver={onDragOver}
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop1}
                                    >
                                        <input
                                            type="file"
                                            id="fileInput"
                                            ref={fileInputRef}
                                            style={{display: 'none'}}
                                            accept=".wav,.mp3,.flac"
                                            onChange={onFileInputChange1}/>
                                        {selectedMusicFile ? <>
                                            <h1 className="centered-text">{selectedMusicFile.name}</h1>
                                            <h5 className="lower-centered-text">Click here to change the file</h5>
                                        </> : <>
                                            <h1 className="centered-text">Click or drag here to<br/>upload
                                                your <b>beat</b></h1>
                                            <h5 className="lower-centered-text">Supported formats:<br/>.wav, .mp3,
                                                .flac
                                            </h5>
                                        </>}
                                    </div>
                                </section>

                                <section className="beat-info">
                                    <form className="info-form">
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}/>
                                        <input
                                            type="number"
                                            max={maxBPM}
                                            min={0}
                                            placeholder="Tempo"
                                            value={bpmValue}
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setBpmValue('');
                                                } else {
                                                    const value = parseInt(e.target.value);
                                                    if (value >= 0 && value <= maxBPM) {
                                                        setBpmValue(value.toString());
                                                    }
                                                }
                                            }}/>
                                        <TagsInput
                                            value={tags}
                                            onChange={handleTagsChange}
                                            beforeAddValidate={beforeAddTagsInput}
                                            name="tags"
                                            placeHolder="#Tags"/>


                                        <GlobalSelect
                                            options={genresList}
                                            isSearchable={true}
                                            isMulti={false}
                                            placeholder="Genres"
                                            value={genre} // Asegúrate de que el valor sea un objeto con las propiedades 'value' y 'label'
                                            onChange={(selected) => setGenre(selected ? selected.value : '')}
                                        />

                                        <GlobalSelect
                                            options={moodsList}
                                            isSearchable={true}
                                            isMulti={true}
                                            placeholder="Mood"
                                            value={moods.map(mood => ({ value: mood, label: mood }))} // Asegúrate de que el valor sea un array de objetos con las propiedades 'value' y 'label'
                                            onChange={(selected) => setMoods(selected ? selected.map((item: { value: string }) => item.value) : [])}
                                        />

                                        <GlobalSelect
                                            options={instrumentsList}
                                            isSearchable={true}
                                            isMulti={true}
                                            placeholder="Instruments"
                                            value={instruments.map(instrument => ({ value: instrument, label: instrument }))} // Asegúrate de que el valor sea un array de objetos con las propiedades 'value' y 'label'
                                            onChange={(selected) => setInstruments(selected ? selected.map((item: { value: string }) => item.value) : [])}
                                        />                                    </form>
                                </section>
                                <section className="caption-and-button">
                                    <form className="next-form" onSubmit={handleSubmit1}>
                                        <div className={"checkboxes"}>
                                            <div className={"termsCheckbox"}>
                                                <input
                                                    className="checkbox"
                                                    type="checkbox"
                                                    id="terms"
                                                    checked={termsAccepted}
                                                    onChange={() => setTermsAccepted(!termsAccepted)}/>
                                                <label className="termsTxt">I have read and accept the terms and
                                                    conditions</label>
                                            </div>
                                            <div className={"copyrightCheckBox"}>
                                                <input
                                                    className="checkbox"
                                                    type="checkbox"
                                                    id="copyright"
                                                    checked={noCopyrightInfringement}
                                                    onChange={() => setNoCopyrightInfringement(!noCopyrightInfringement)}/>
                                                <label className="copyrightTxt">I confirm that I am not uploading
                                                    copyrighted
                                                    content</label>
                                            </div>

                                        </div>
                                        <button className={"next-btn"} type="submit">
                                            <img className={"next-btn-img"} src={rightarrow} alt="Next"/>
                                        </button>
                                    </form>
                                </section>
                            </animated.div>
                        </main>
                    </>
                ) : (
                    <>
                        <main>
                            <animated.div className="centerDiv-Upload" style={slideAnimationNext}>

                                <section className="next-caption-and-button">
                            <textarea className={"next-caption"} spellCheck={false}
                                      placeholder="Add a caption or a description for this beat..."
                                      onChange={(e) => setDescription(e.target.value)}/>
                                </section>
                                <section className="next-drop-pic dragging-parent">
                                    <form className={"next-form"} onSubmit={handleSubmit2}>
                                        <div
                                            className={`next-image-container ${selectedImgFile ? 'file-selected' : ''} ${dragging ? 'dragging' : ''}`}
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
                                                onChange={onFileInputChange2}/>
                                            {selectedImgFile ? (
                                                <>
                                                    <img src={URL.createObjectURL(selectedImgFile)} alt="Selected"
                                                         className="selected-image"/>
                                                    <button onClick={removeImage} className="remove-image-button">×
                                                    </button>
                                                    <h5 className={`lower-centered-text ${selectedImgFile ? 'lower-centered-text-shadow' : ''}`}>Click
                                                        here to change the file</h5>
                                                </>
                                            ) : (
                                                <>
                                                    <h1 className="centered-text">Upload your cover art here</h1>
                                                    <h5 className="lower-centered-text">Supported formats: .jpg, .png,
                                                        .gif,
                                                        etc.
                                                    </h5>
                                                </>
                                            )}
                                        </div>
                                        <button className={"upload-btn"} type={"submit"}><b>Upload Beat</b></button>
                                    </form>
                                </section>
                            </animated.div>
                        </main>
                    </>
                    )}
                <div className={"tabs"}>
                    <animated.div style={spring} className={`tab-indicator ${next ? 'inactive' : 'active'}`}
                                  onClick={() => setNext(false)}/>
                    <animated.div style={spring} className={`tab-indicator ${next ? 'active' : 'inactive'}`}
                                  onClick={() => {
                                      if (validateForm()) {
                                          setNext(true);
                                      }
                                  }}
                    />
                </div>
            </div>
    );
}

export default Upload;
