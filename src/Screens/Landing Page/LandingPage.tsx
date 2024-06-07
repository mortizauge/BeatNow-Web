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
    const nav = navigator.userAgent;
    const [clicks, setClicks] = React.useState(1);
    const [mobileDisplay, setMobileDisplay] = React.useState(false);
    function qrClick() {
        window.open("http://217.182.70.161:6969/v1/api/download/android-apk/");
    }

    // Controlador de eventos para el evento resize
    const handleResize = () => {
        setMobileDisplay(window.innerWidth < 600);
    };


    React.useEffect(() => {
        // Agregar el controlador de eventos al evento resize
        window.addEventListener('resize', handleResize);

        if (window.innerWidth < 600) {
            setMobileDisplay(true);
        }
        else {
            setMobileDisplay(false);
        }

        // Limpiar el controlador de eventos cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div className="app">

            <Header />

            <div className="centerDiv">
                <main>
                    <section className="studio-image">
                        <img className={"studio-image-PNG"} src={studio} alt="Studio"/>
                    </section>

                    <section className="contentLanding">
                        <div className={"intro"}>
                            <h1>Welcome to <b>BeatNow</b></h1>
                                {mobileDisplay ?
                                    <div className={"dl-btn-div"}>
                                        <h3>Click to download the app:</h3>
                                        <button className={"dl-btn"} onClick={qrClick} title={"Click to download the app"}>
                                            <img src={logo} className={"btn-pic"}/>
                                        </button>
                                    </div>:
                                    <div className={"qr-div"}>
                                        <h3>Scan the code to download the app:</h3>
                                        <div className={"qr-frame"} onClick={qrClick}>
                                            <img className={"qr-pic"} src={qr}  title={"Click to download the app"}></img>
                                        </div>
                                    </div>

                                        }
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
