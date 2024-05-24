import React, { useState } from "react";import Header from "../../Layout/Header/Header";
import LeftSlide from "../../Layout/LeftSlide/LeftSlide";
import UserSingleton from "../../Model/UserSingleton";
import { motion, AnimatePresence } from "framer-motion"
import "./Dashboard.css"; // Importa el archivo CSS para Dashboard

function Dashboard() {
    function handleClick() {
        window.location.href = "/Upload";
    }


    return (
        <div className="app">
            <Header/>
            <div className="leftSlide">
                <LeftSlide/>
            </div>
            <div className="content">
                <section>
                    <h1 className={"home"}>{UserSingleton.getInstance().getUsername()}'s dashboard</h1>
                    <h3>Recent Uploads</h3>
                    <div className={"section-container"}>
                        <div className="card">
                            <img src={"https://www.w3schools.com/howto/img_avatar.png"} alt={"Avatar"}/>
                            <h4><b>John Doe</b></h4>
                            <p>Architect & Engineer</p>
                        </div>
                        <div className="card">
                            <img src={"https://www.w3schools.com/howto/img_avatar.png"} alt={"Avatar"}/>
                            <h4><b>John Doe</b></h4>
                            <p>Architect & Engineer</p>
                        </div>
                    </div>
                    <h3>Popular Uploads</h3>
                    <div className={"section-container"}>
                        <div className="card">
                            <img src={"https://www.w3schools.com/howto/img_avatar.png"} alt={"Avatar"}/>
                            <h4><b>John Doe</b></h4>
                            <p>Architect & Engineer</p>
                        </div>
                        <div className="card">
                            <img src={"https://www.w3schools.com/howto/img_avatar.png"} alt={"Avatar"}/>
                            <h4><b>John Doe</b></h4>
                            <p>Architect & Engineer</p>
                        </div>
                    </div>
                </section>
                <section>
                    <button className={"uploadButton"} onClick={handleClick}>Upload Beat</button>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
