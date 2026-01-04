import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
       
          <div className="footer-brand">
            <h2 className="footer-logo">
              |JF.<span>SHOP|</span>
            </h2>
            <p className="footer-description">
              Tu tienda de moda online con las últimas tendencias para hombres, mujeres y niños. Calidad y estilo al mejor precio.
            </p>
            <div className="footer-social">
              <a href="https://github.com/jhonFDeveloper" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/jhon-f-mendieta-4b75b8126/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/jhonfcompu/?next=%2F" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

         
          <nav className="footer-column">
            <h4>Categorías</h4>
            <ul>
              <li><a href="/hombres">Hombres</a></li>
              <li><a href="/mujeres">Mujeres</a></li>
              <li><a href="/ninos">Niños</a></li>
              <li><a href="/ofertas">Ofertas</a></li>
              <li><a href="/novedades">Novedades</a></li>
            </ul>
          </nav>

       
          <nav className="footer-column">
            <h4>Atención al Cliente</h4>
            <ul>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/envios">Envíos y devoluciones</a></li>
              <li><a href="/faq">Preguntas frecuentes</a></li>
              <li><a href="/tallas">Guía de tallas</a></li>
              <li><a href="/terminos">Términos y condiciones</a></li>
            </ul>
          </nav>

      
          <div className="footer-column footer-newsletter">
            <h4>Suscríbete</h4>
            <p>Recibe ofertas exclusivas y novedades</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Tu email"
                aria-label="Ingresa tu correo electrónico"
                required
              />
              <button type="submit" aria-label="Suscribirse al newsletter">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

    
      <div className="footer-bottom">
        <div className="footer-container">
          <p>© {currentYear} creado por Jhon Fredy Mendieta Suárez — Todos los derechos reservados</p>          
        </div>
      </div>
    </footer>
  );
};