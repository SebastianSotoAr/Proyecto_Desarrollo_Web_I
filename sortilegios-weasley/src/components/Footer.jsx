import { Link } from 'react-router-dom';
import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="magic-footer bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="mb-3 d-flex align-items-center">
              <img src="Sortilegios_Weasley_Cropped.png" alt="Logo de Sortilegios Weasley" width="30%" height="30%" className="me-2" />
              <span className="footer-title">Sortilegios Weasley</span>
            </div>
            <div className="social-icons d-flex gap-3">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-x"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="text-warning">Explorar</h6>
            <ul className="nav flex-column">
              <li className="nav-item"><Link className="nav-link link-light" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/login">Inicio de sesión</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/cart">Carrito</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="text-warning">Productos</h6>
            <ul className="nav flex-column">
              <li className="nav-item"><Link className="nav-link link-light" to="/">Bromas mágicas</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/">Dulces encantados</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/">Artículos explosivos</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/">Defensa mágica</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="text-warning">Ayuda</h6>
            <ul className="nav flex-column">
              <li className="nav-item"><Link className="nav-link link-light" to="/ayuda/preguntas">Preguntas frecuentes</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/ayuda/soporte">Soporte</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/ayuda/politicas">Políticas de compra</Link></li>
              <li className="nav-item"><Link className="nav-link link-light" to="/ayuda/contacto">Contáctanos</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;