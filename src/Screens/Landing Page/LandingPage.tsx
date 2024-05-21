// src/components/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../../assets/Logo.png';
import studio from '../../assets/Studio 2.jpeg';
import Header from "../../Layout/Header/Header";

function Landing() {
    return (
        <div className="app">

            <Header />

            <div className="centerDiv">
                <main>
                    <section className="studio-image">
                        <img className={"studio-image-PNG"} src={studio} alt="Studio"/>
                    </section>

                    <section className="contentLanding">
                        <h1>Welcome to <b>BeatNow</b>, the ultimate beat finding experience! <br/>
                            Find and share rhythms to fuel your creativity and <b>elevate your music.</b></h1>

                        <div className={"tryDiv"}>
                            <h4>Wanna try?<a className="buttonSignUp" href="/register">Sign up
                                now!</a></h4>
                        </div>
                        <h6>Already have an account? <br/>
                            <Link className={"LogIn"} to="/login">Sign in</Link>
                        </h6>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Landing;
