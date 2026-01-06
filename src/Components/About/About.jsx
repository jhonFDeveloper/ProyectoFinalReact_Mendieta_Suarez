import { Footer } from "../Footer/Footer";
import "./About.css";

export const About = () => {
  return (
    <>
    <section className="about-container">
      <div className="about-hero">
        <h1>
          Acerca de <span>|JF</span>.SHOP|
        </h1>
        <p>
          Moda para todos, estilo para cada momento.
        </p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <h2>¿Quiénes somos?</h2>
          <p>
            <strong><span>|JF</span>.SHOP|</strong> es un e-commerce dedicado a la venta de ropa
            para <strong>hombres, mujeres y niños</strong>, creado con el
            propósito de ofrecer prendas modernas, cómodas y accesibles para
            toda la familia.
          </p>
        </div>

        <div className="about-card">
          <h2>Nuestra misión</h2>
          <p>
            Brindar una experiencia de compra sencilla, segura y confiable,
            ofreciendo productos de calidad que se adapten a diferentes estilos
            de vida, edades y ocasiones.
          </p>
        </div>

        <div className="about-card">
          <h2>Nuestra visión</h2>
          <p>
            Convertirnos en una tienda online de referencia en moda, destacándonos
            por nuestro compromiso con el cliente, la innovación y la mejora
            continua de nuestros servicios.
          </p>
        </div>

        <div className="about-card">
          <h2>¿Por qué elegirnos?</h2>
          <ul>
            <li>✔ Ropa para toda la familia</li>
            <li>✔ Tendencias actuales</li>
            <li>✔ Precios competitivos</li>
            <li>✔ Compra rápida y segura</li>
            <li>✔ Atención cercana y confiable</li>
          </ul>
        </div>
      </div>    
    </section>
      <Footer/>
    </>
  );
};


