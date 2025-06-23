import React, { useState } from 'react';
import "../styles/login.css";
import TermsModal from '../components/TermsModal';
import { useNavigate } from 'react-router-dom';


const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!acceptedTerms) {
      setError('Debes aceptar los Términos y Condiciones.');
      return;
    }
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess(username);
      navigate('/')
    } else {
      setError('Usuario o contraseña incorrectos prueba admin de usuario y admin contraseña.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/Sortilegios_Weasley_Cropped.png" alt="Logo" className="login-logo" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="form-group d-flex align-items-center">
            <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
            <label htmlFor="terms" className="ms-2">
              Acepto los <button type="button" onClick={() => setShowTerms(true)} className="btn btn-link p-0">Términos y Condiciones</button>
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Acceder</button>
        </form>

        {/* Modal personalizado */}
        {/* Reutiliza el componente TermsModal con control manual */}
        {showTerms && (
  <TermsModal
    forceOpen={true}
    onClose={() => setShowTerms(false)}
  />
)}

      </div>
    </div>
  );
};

export default LoginPage;
