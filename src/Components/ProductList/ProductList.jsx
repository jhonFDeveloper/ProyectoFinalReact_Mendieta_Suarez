import { useState, useEffect} from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";


export const ProductList = () => {

const [products, setProducts] = useState([]);
const [error, setError] = useState(null);
const [orden, setOrden] = useState("Relevantes");
const [filtros, setFiltros] = useState({ categorias: [], tipos: []});
const navigate = useNavigate()



useEffect(() => {
    const fetchProducts = async () => {
        try{
            const response = await fetch("https://api-ten-jet.vercel.app/products");
            if(!response.ok){
                throw new Error("Error al cargar los productos");
            }
            const data = await response.json();
            setProducts(data);
        }catch (err){
            setError(err.message);
        }
    }
    fetchProducts();
},[]);

const toggleFilters = (tipoFiltro, valor) =>{
 setFiltros((prev) => ({
    ...prev,
    [tipoFiltro]: prev[tipoFiltro].includes(valor)
    ? prev[tipoFiltro].filter((item) => item !== valor)
    : [...prev[tipoFiltro], valor],    
 }))
}

const productsFiltered = products.filter((product)=>{
    const matchCategory = 
    filtros.categorias.length === 0 || filtros.categorias.includes(product.categoria)
    const matchType = 
    filtros.tipos.length === 0 || filtros.tipos.includes(product.tipo)
    return matchCategory && matchType;
})

const HandleOrdenChange = (e) => {
  setOrden(e.target.value)
}

const orderedProducts = [...productsFiltered].sort((a, b) => {
    if (orden === "Precio: Menor a Mayor"){
        return a.precio - b.precio
    } if (orden === "Precio: Mayor a Menor") {
        return b.precio - a.precio
    }
    return 0;
})

const handleImageClick = (id) => {
    navigate(`/product/${id}`);
}

  return (
    <section className="main-content">
        <aside className="filters">
         <h2>Filtrar</h2>
          <div className="filters-category">
            <div className="filter-category">
                <h3>Categorias</h3>
                <label>
                    <input type="checkbox" onChange={() => toggleFilters("categorias", "Hombres")} />
                    <span>Hombre</span>
                </label>
                <label>
                    <input type="checkbox" onChange={() => toggleFilters("categorias", "Mujeres")}/>
                    <span>Mujer</span>
                </label>
                 <label>
                    <input type="checkbox" onChange={() => toggleFilters("categorias", "Niños")}/>
                    <span>Niños</span>
                </label>
            </div>

            <div className="filter-category">
                <h3>Tipos</h3>
                <label>
                    <input type="checkbox" onChange={() => toggleFilters("tipos", "Prendas de abrigo")}/>
                    <span>Prendas de abrigo</span>
                </label>
                <label>
                    <input type="checkbox" onChange={() => toggleFilters("tipos", "Ropa Interior")}/>
                    <span>Ropa Interior</span>
                </label>
                 <label>
                    <input type="checkbox" onChange={() => toggleFilters("tipos", "Calzado")}/>
                    <span>Calzado</span>
                </label>
            </div>
          </div>
        </aside>

        <main className="collections">
          <div className="options">
             <h2>TODAS LAS COLECCIONES</h2>

             <div className="sort-options">
                <label>
                  <span>Ordenar por:</span>
                   <select onChange={HandleOrdenChange} value = { orden } >
                     <option>Relevantes</option>
                     <option>Precio: Menor a Mayor</option>
                     <option>Precio: Mayor a Menor</option>                            
                   </select>
               </label>
             </div>
          </div>
           

           <div className="products">
            {error ? (
                <p className="error-message">{error}</p>
             ):  productsFiltered.length > 0 ?  (
                 orderedProducts.map((product) => (
                    <div className="product-card" key={product.id}>

                      <img src={product.image} alt={product.nombre} className="product-image" 
                      onClick={() => handleImageClick(product.id)}/>
                      <h3>{product.nombre}</h3>
                      <p>${product.precio}</p>                      
                    </div>
                ))
            ) : (
                <p className="no-results">
                    No hay productos que coincidan con los filtros seleccionados
                 </p>
            )}

           </div>

        </main>

    </section>
  )
}
