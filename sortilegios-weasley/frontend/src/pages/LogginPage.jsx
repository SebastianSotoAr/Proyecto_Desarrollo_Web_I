import React, { useState, useContext } from 'react';
import "../styles/login.css";
import TermsModal from '../components/TermsModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/auth'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
 const { login } = useContext(AuthContext);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!acceptedTerms) {
      setError('Debes aceptar los Términos y Condiciones.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password
      });
      console.log("Respuesta:", res);
      
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      login(user, token);
     

      navigate('/');
    } catch (err) {
  console.error("Error en login:", err);
  console.error("Respuesta del servidor:", err.response?.data);
  setError('Credenciales inválidas. Verifica usuario y contraseña.');
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
