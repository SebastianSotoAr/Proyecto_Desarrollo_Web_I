import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/login.css";
import TermsModal from '../components/TermsModal';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario_muggle');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // 🧠 Pregunta mágica
  const [magicQuestion, setMagicQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');

  // Obtener una pregunta mágica si se selecciona el rol mágico
  useEffect(() => {
    if (role === "usuario_magico") {
      axios.get('http://localhost:5000/api/users/quiz-question')
        .then(res => {
          setMagicQuestion(res.data);
          setQuizAnswer(''); // Resetear respuesta
        })
        .catch(() => setError("No se pudo cargar la pregunta mágica."));
    } else {
      setMagicQuestion(null);
      setQuizAnswer('');
    }
  }, [role]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!acceptedTerms) {
      setError("Debes aceptar los Términos y Condiciones.");
      return;
    }

    try {
      const body = {
        username,
        password,
        role
      };

      // Si es usuario mágico, añadir respuesta mágica
      if (role === "usuario_magico") {
        if (!quizAnswer.trim()) {
          setError("Debes responder la pregunta mágica.");
          return;
        }
        body.quizAnswer = quizAnswer;
        body.questionId = magicQuestion.id;
      }

      await axios.post('http://localhost:5000/api/users/register', body);

      setSuccess("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/Sortilegios_Weasley_Cropped.png" alt="Logo" className="login-logo" />
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Rol:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
              <option value="usuario_muggle">Usuario Muggle</option>
              <option value="usuario_magico">Usuario Mágico</option>
            </select>
          </div>

          {/* Pregunta mágica solo si es usuario_magico */}
          {role === "usuario_magico" && magicQuestion && (
            <div className="form-group">
              <label>{magicQuestion.question}</label>
              <select value={quizAnswer} onChange={(e) => setQuizAnswer(e.target.value)} required>
                <option value="">Selecciona una opción</option>
                {magicQuestion.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group d-flex align-items-center">
            <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
            <label htmlFor="terms" className="ms-2">
              Acepto los <button type="button" onClick={() => setShowTerms(true)} className="btn btn-link p-0">Términos y Condiciones</button>
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="login-btn">Registrarse</button>
        </form>

        {showTerms && (
          <TermsModal forceOpen={true} onClose={() => setShowTerms(false)} />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
