import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa los estilos de FontAwesome
import './LeftSlide.css'; // Importa el archivo CSS

function LeftSlide() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
    setIsClosing(isVisible); // Asegúrate de que isClosing refleje correctamente el estado del menú
  };

  return (
    <div className={`container1 ${isVisible ? 'expanded' : ''} ${isClosing ? 'closing' : ''}`}>
      <button className={`button ${isVisible ? "rotate" : ""}`} onClick={toggleMenu}>
        {isVisible ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
      {isVisible && (
        <>
          <ul className="menu">
            <li className="menu-item slide-in"><i className="fa-solid fa-house"></i>Home</li>
            <li className="menu-item slide-in"><i className="fa-solid fa-music"></i>Beats</li>
            <li className="menu-item slide-in"><i className="fa-solid fa-chart-column"></i>Stats</li>
          </ul>
          <Link to="/Upload" className={`uploadBeat ${isVisible ? 'slide-in' : 'slide-out'}`}>Upload</Link>
        </>
      )}
    </div>
  );
}

export default LeftSlide;
