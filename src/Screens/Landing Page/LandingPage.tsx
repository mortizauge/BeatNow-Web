// src/components/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../../assets/Logo.png';
import frame from '../../assets/Frame 2.png';
import studio from '../../assets/Studio 2.jpeg';
import troll from '../../assets/troll.jpg';
import Header from "../../Layout/Header/Header";
import qr from '../../assets/qrbeatnow.png';
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

function Landing() {
    const [clicks, setClicks] = React.useState(1);
    function qrClick() {
        window.open("http://217.182.70.161:6969/download/android-apk");
    }


    return (
        <div className="app">

            <Header />

            <div className="centerDiv">
                <main>
                    <section className="studio-image">
                        <img className={"studio-image-PNG"} src={studio} alt="Studio"/>
                    </section>

                    <section className="contentLanding">
                        <h1>Welcome to <b>BeatNow</b></h1>
                        <div className={"qr-div"}>
                            <h3>Scan the code to download the app:</h3>
                            <img className={"qr-pic"} src={qr} onClick={qrClick} title={"Click to download the app"}></img>
                        </div>

                        <div className={"tryDiv"}>
                            <h4 className={"h4-landing"}>Wanna try?<a className="buttonSignUp" href="/register">Sign up
                                now</a></h4>

                            <h6>Already have an account? <br/>
                                <Link className={"LogIn"} to="/login">Sign in</Link>
                            </h6>
                        </div>

                    </section>
                </main>
            </div>
        </div>
    );
}

export default Landing;
