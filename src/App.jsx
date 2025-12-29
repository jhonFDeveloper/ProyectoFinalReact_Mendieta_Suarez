import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { NavBar} from "./Components/NavBar/NavBar";
import { Categories } from "./Components/Categories/Categories";
import { DetailsProduct } from "./Components/DetailsProduct/DetailsProduct";


function App() {

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={ <Home/>} />    
          <Route path="/Categorias" element={ <Categories/>} />       
          <Route path="/product/:id" element={ <DetailsProduct/>} />   
        </Routes>        
      </Router>
    </>
  )
}

export default App
