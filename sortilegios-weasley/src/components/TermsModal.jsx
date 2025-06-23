import React, { useEffect, useState } from 'react';
import '../styles/TermsModal.css';

const TermsModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('acceptedTerms');
    if (!accepted) setShow(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('acceptedTerms', 'true');
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Términos y Condiciones</h2>
            <p>
              Al continuar usando este sitio, aceptas nuestros términos mágicos.
              Sortilegios no se hace responsable por explosiones inesperadas.
            </p>
            <button onClick={handleAccept}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsModal;
