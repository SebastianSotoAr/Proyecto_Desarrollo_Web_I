import React, { useState } from 'react';
import "../styles/login.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Lógica de autenticación simple
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess(true); // Pasar 'true' para indicar que el usuario está autorizado
    } else {
      setError('Usuario o contraseña incorrectos. Intenta con "admin" y "admin".');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img 
          src="/Gemini_Generated_Image_zgqimxzgqimxzgqi.png" 
          alt="Logo de la aplicación" 
          className="login-logo" 
        />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Acceder</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;