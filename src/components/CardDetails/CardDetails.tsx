import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import './CardDetails.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface Post {
    title: string;
    tags: string[];
    genre: string;
    moods: string[];
    instruments: string[];
    bpm: number;
    user_id: string;
    publication_date: string;
    audio_format: string;
    likes: number;
    saves: number;
    _id: string;
}

interface CardDetailsProps {
    post: Post;
    audio: string;
    image: string; // Add this line
    layoutId: string;
    onClose: () => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({ post, audio, image, layoutId, onClose }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div className="card-details-popup">
            <AnimatePresence>
                <motion.div
                    className="card-details-content"
                    layoutId={layoutId}
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.7 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="card-details-header">
                        <h1><b>{post.title}</b></h1>
                        <button className="card-closeBtn" onClick={onClose}>✖</button>
                    </div>
                    <div
                        className="card-image-container"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className={`card-image-gradient`}>
                            <img className="card-details-image" src={image} alt="Cover Image" />
                        </div>
                    </div>
                    <div className="card-audio-container">
                    <div className={`audio-player ${isHovered ? 'visible' : 'hidden'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>                        <AudioPlayer
                            autoPlay
                            loop={true}
                            src={audio}
                            showJumpControls={false}
                            showSkipControls={false}
                            showDownloadProgress={false}
                            customAdditionalControls={[]}
                            volume={0.20}
                            onPlay={e => console.log("onPlay")}
                        />
                    </div>
                    </div>
                    <div className="card-details-info">
                        <section className={"cd-sect"}>
                            <div className="info-data">
                                <h4 className="info"><b>Genre:</b> {post.genre}</h4>
                                <h4 className="info"><b>Moods:</b> {post.moods.join(', ').toString().replace(/[\[\]"]/g, '')}</h4>
                                <h4 className="info"><b>Instruments:</b> {post.instruments.join(', ').toString().replace(/[\[\]"]/g, '')}</h4>
                                <h4 className="info"><b>BPM:</b> {post.bpm}</h4>
                            </div>
                        </section>
                        <section className={"cd-sect"}>
                            <div className="info-social">
                                <h4 className="info"><b>Tags: </b> {post.tags.join(' ').toString().replace(/[\[\]"]/g, '')}</h4>
                                <h4 className="info"><b>Likes:</b> {post.likes}</h4>
                                <h4 className="info"><b>Saves:</b> {post.saves}</h4>
                            </div>
                        </section>
                    </div>

                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default CardDetails;
