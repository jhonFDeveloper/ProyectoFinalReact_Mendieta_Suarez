import { useEffect, useState } from "react";
import "./DetailsProduct.css";
import { useParams } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import { app } from "../../firebaseConfig.";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const DetailsProduct = () => {

  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useCart();

  const handleAgregarAlCarrito = () => {

    if (producto) {
      agregarAlCarrito({
        id: producto.id,
        imagen: producto.image,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      });
    }
  };

  useEffect(() => {

    const fetchProducto = async () => {
      try {
        console.log("Buscando producto con ID:", id);
        
        const db = getFirestore(app);
        
        
        const idNumero = parseInt(id);
        
        
        const q = query(
          collection(db, "items"),
          where("id", "==", idNumero)
        );
        
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          
          console.log("Producto encontrado:", data);
          
          setProducto({
            ...data,
            docId: doc.id 
          });
        } else {
          setError("Producto no encontrado");
          console.error("No se encontró producto con id:", idNumero);
        }
      } catch (err) {
        console.error("Error al cargar el producto desde Firestore:", err);
        setError("Error al cargar el producto: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    } else {
      setError("ID de producto no válido");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p className="loading-message">Cargando producto...</p>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-message">{error}</h2>
        <p>ID buscado: {id}</p>
        <button onClick={() => window.history.back()}>Volver</button>
      </div>
    );
  }

  return (
    
    <div className="product-details">
      {producto && (
        <>
          <img
            src={producto.image}
            alt={producto.nombre}
            className="image-small"
          />
          <img src={producto.image} alt={producto.nombre} />

          <div className="product-infos">
            <h1>{producto.nombre || "Sin nombre"}</h1>
            <p className="price">
              ${producto.precio?.toLocaleString() || "0"}
            </p>
            <p className="description">
              {producto.descripcion || "Sin descripción disponible"}
            </p>

            <div className="size-options">
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>

            <button className="add-to-cart" onClick={handleAgregarAlCarrito}>
              Añadir al carrito
            </button>
          </div>

          <p className="note">
            Producto 100% original. El pago contra reembolso está disponible para este producto. Política
            de devolución y cambio fácil dentro de los 7 días.
          </p>
        </>
      )}
    </div>
  );
};