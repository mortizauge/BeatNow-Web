import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import Header from "../../Layout/Header";

//Crear una pagina dashboard en la que tenga un layout lateral a la izquierda para ver diferentes opciones como perfil, beats y estadisticas
//En la parte central se vera la informacion dependiendo de la opcion seleccionada

function Dashboard() {
    return (
        <div className="app">
            <header>
                <Header />
            </header>
            <div className="centerDiv">
                <main>
                    <section className="drop-beat">
                        <div className="image-container">
                            <h1 className="centered-text">Dashboard</h1>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;