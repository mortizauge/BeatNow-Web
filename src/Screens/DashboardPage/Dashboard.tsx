import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import Header from "../../Layout/Header/Header";
import "../../Layout/LeftSlide/LeftSlide";
import LeftSlide from "../../Layout/LeftSlide/LeftSlide";

//Crear una pagina dashboard en la que tenga un layout lateral a la izquierda para ver diferentes opciones como perfil, beats y estadisticas
//En la parte central se vera la informacion dependiendo de la opcion seleccionada

function Dashboard() {
    return (
        <div className="app">
            <Header />
            <div className="leftSlide" style={{display: "flex"}}>
                <LeftSlide />

            </div>
            
        </div>
    );
}

export default Dashboard;