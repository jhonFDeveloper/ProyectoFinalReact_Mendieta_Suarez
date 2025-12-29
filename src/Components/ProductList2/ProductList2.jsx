import { useState, useEffect } from "react";
import "./ProductList2.css";
import { app } from "../../../../ProyectoFinal_Mendieta_Suarez/src/firebaseConfig";
import { collection, getFirestore, getDocs } from "firebase/firestore";

export const ProductList2 = () => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore(app);
        const itemCollection = collection(db, "items");

        const querySnapshot = await getDocs(itemCollection);

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,           
          ...doc.data(),        
        }));

        console.log("Productos obtenidos:", productsData);
        setProducts(productsData);
      } catch (err) {
        console.error("Error al traer los productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageClick = (id) => {
    console.log(`Producto clickeado: ${id}`);    
  };

  if (loading) {
    return <p className="loading">Cargando productos...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (

    <section>
      <main>
        <div className="products">
          {products.length === 0 ? (
            <p className="no-results">No hay productos disponibles</p>
          ) : (
            products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.nombre || "Producto sin nombre"}
                  className="product-image"
                  onClick={() => handleImageClick(product.id)}
                />
                <h3>{product.nombre || "Sin nombre"}</h3>
                <p>${product.precio?.toLocaleString() || "0"}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </section>
    
  );
};