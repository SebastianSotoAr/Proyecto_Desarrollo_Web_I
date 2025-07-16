import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { AuthContext } from "../components/auth";



const Header = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="magical-header">
  <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/Sortilegios_Weasley_Cropped.png"
          alt="Logo"
          width="40"
          height="40"
          className="me-2 rounded"
        />
        <span>Sortilegios Weasley</span>
      </Link>

      {/* ✅ BOTÓN HAMBURGUESA */}
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

      {/* ✅ USUARIO Y GALEONES (SE MUEVE A LA PARTE DERECHA SI QUIERES) */}
      <div className="d-flex align-items-center text-light me-3 navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link" to="/pedidos">
            <span id="orders-icon" style={{ fontSize: "1.5rem" }}>🦉</span> Mis pedidos
          </Link>
        </li>
        {isLoggedIn ? (
          <span className="me-3">
            👤 {user?.name || user?.username} | 💰 {user?.money ?? 0} galeones
          </span>
        ) : (
          <span className="me-3">👤 Invitado</span>
        )}
      </div>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <span id="cart-icon" style={{ fontSize: "1.5rem" }}>🛒</span> Carrito
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/perfil">Perfil</Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-light"
                  onClick={handleLogoutClick}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
</header>
  );
};

export default Header;
