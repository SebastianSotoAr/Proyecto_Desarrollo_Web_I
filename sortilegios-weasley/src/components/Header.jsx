import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();         // Marca como no autenticado
    navigate('/login'); // Redirige al login
  };

  return (
    <header className="magical-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/Sortilegios_Weasley_Cropped.png"
              alt="Logo de Sortilegios Weasley"
              width="40"
              height="40"
              className="me-2 rounded"
            />
            <span> Sortilegios Weasley</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Carrito</Link>
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <button className="nav-link btn btn-link text-light" onClick={handleLogoutClick}>
                    Cerrar sesión
                  </button>
                ) : (
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;