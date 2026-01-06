import { Footer } from "../Footer/Footer";
import "./Contacto.css";

export const Contacto = () => {
  return (

    <>
    <section className="contacto-container">
      <div className="contacto-header">
        <h1>
          Contáctanos en <span>|JF</span>.SHOP|
        </h1>
        <p>
          ¿Tienes preguntas, sugerencias o necesitas ayuda? Escríbenos, estaremos
          encantados de ayudarte.
        </p>
      </div>

      <div className="contacto-content">
      
        <form className="contacto-form">
          <h2>Formulario de contacto</h2>

          <input
            type="text"
            placeholder="Nombre completo"
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            required
          />

          <textarea
            placeholder="Escribe tu mensaje"
            rows="5"
            required
          ></textarea>

          <button type="submit">Enviar mensaje</button>
        </form>

      
        <div className="contacto-mapa">
          <h2>Ubicación</h2>
          <iframe
            title="Mapa Medellín"
            src="https://www.google.com/maps?q=Medellín,Colombia&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>      
    </section>
    <Footer/>
    </>
  );
};

