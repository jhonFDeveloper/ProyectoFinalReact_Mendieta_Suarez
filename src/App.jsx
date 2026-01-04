import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { NavBar} from "./Components/NavBar/NavBar";
import { Categories } from "./Components/Categories/Categories";
import { DetailsProduct } from "./Components/DetailsProduct/DetailsProduct";
import { CartProvider } from "./Components/CartContext/CartContext";
import { Cart } from "./Components/Cart/Cart";
import { About } from "./Components/About/About";
import { Contacto } from "./Components/Contacto/Contacto";


function App() {

  return (
    <>
    <CartProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Home/>} />    
          <Route path="/Categorias" element={ <Categories/>} />       
          <Route path="/product/:id" element={ <DetailsProduct/>} />   
          <Route path="/carrito" element={ <Cart/> }/>  
          <Route path="/About" element={ <About/> }/>  
          <Route path="/Contacto" element={ <Contacto/> }/> 
        </Routes>        
      </Router>
      </CartProvider>
    </>
  )
}

export default App


