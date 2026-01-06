// import { useCart } from "../CartContext/CartContext";
// import "./NavBar.css"
// import { Link } from "react-router-dom";

// export const NavBar = () => {

//   const {carrito} = useCart();

//   const totalProductos = carrito.reduce ((acc, producto) =>
//     acc + producto.cantidad, 0
//   )

//   return (

//     <section className='header'>

//         <h1 className='logo'>|JF<span>.SHOP|</span></h1>

//         <nav className="navbar">
//             <ul className="nav-links">
//                <li>
//                  <Link to = "/">Inicio</Link>
//                </li>

//                <li>
//                   <Link to = "/Categorias">Colecciones</Link>
//                 </li>

//                 <li>
//                   <Link to = "/About">Sobre nosotros</Link>
//                 </li>

//                  <li>
//                   <Link to = "/Contacto">Contacto</Link>
//                 </li> 
//             </ul>
//         </nav>

//         <div className="icons">

//           <button className="search-button">
//             <i className="fas fa-search"></i>
//           </button>

//          <Link to = "/carrito" className="icon-button">
//          <i className="fas fa-shopping-cart"></i>
//          <span className="counter">{totalProductos}</span>         
//          </Link>

//         </div>

//     </section>
//   )
// }

import { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import "./NavBar.css"
import { Link } from "react-router-dom";

export const NavBar = () => {

  const {carrito} = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalProductos = carrito.reduce ((acc, producto) =>
    acc + producto.cantidad, 0
  )

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (

    <section className='header'>

        <button className="hamburger" onClick={toggleMenu}>
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        <h1 className='logo'>|JF<span>.SHOP|</span></h1>

        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
               <li>
                 <Link to="/" onClick={closeMenu}>Inicio</Link>
               </li>

               <li>
                  <Link to="/Categorias" onClick={closeMenu}>Colecciones</Link>
                </li>

                <li>
                  <Link to="/About" onClick={closeMenu}>Sobre nosotros</Link>
                </li>

                 <li>
                  <Link to="/Contacto" onClick={closeMenu}>Contacto</Link>
                </li> 
            </ul>
        </nav>

        <div className="icons">

          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>

         <Link to="/carrito" className="icon-button">
         <i className="fas fa-shopping-cart"></i>
         <span className="counter">{totalProductos}</span>         
         </Link>

        </div>

    </section>
  )
}


