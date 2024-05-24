import React from 'react';
import logo from '../../assets/Logo.png';
import Header from "../../Layout/Header/Header";

function SignUpPage() {
    return (
        <div className="app">
            < Header />

            <div className="centerDiv">
                <main>
                    <section className="studio-image">
                    </section>

                    <section className="contentLanding">
                        <h1>Welcome to <b>BeatNow</b>, the ultimate beat finding experience! <br/>
                            Find and share rhythms to fuel your creativity and <b>elevate your music.</b></h1>

                        <div className={"tryDiv"}>
                            <h4>Wanna try?<a className="buttonSignUp" href="/register">Sign up
                            now!</a></h4>
                        </div>
                        <p>Already have an account? <br/>
                            <a className={"LogIn"} href="/login">Sign in</a>
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default SignUpPage;