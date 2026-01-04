import { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import { Footer } from "../Footer/Footer";
import { app } from "../../firebaseConfig.";
import { collection, addDoc, serverTimestamp, getFirestore } from "firebase/firestore";
import Swal from "sweetalert2";
import "./Cart.css";

export const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();
  const [cargando, setCargando] = useState(false);

  const costoDeEnvio = 10;

  const subTotal = carrito.reduce((acc, producto) =>
    acc + producto.precio * producto.cantidad, 0
  );

  const total = subTotal + costoDeEnvio;

  const handleAumentarCantidad = (productoId) => {
    actualizarCantidad(productoId, 1);
  };

  const handleDisminuirCantidad = (productoId) => {
    const producto = carrito.find((item) => item.id === productoId);
    if (producto.cantidad > 1) {
      actualizarCantidad(productoId, -1);
    }
  };

  const handlePagar = async () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "Tu carrito está vacío. Agrega productos antes de pagar.",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    setCargando(true);

    try {
      const db = getFirestore(app);
      

      const venta = {
        productos: carrito.map(producto => ({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: producto.cantidad,
          subtotal: producto.precio * producto.cantidad,
          imagen: producto.imagen || null
        })),
        subtotal: subTotal,
        costoEnvio: costoDeEnvio,
        total: total,
        fecha: serverTimestamp(),
        estado: "pendiente"
      };


      const ventasCollection = collection(db, "ventas");
      const docRef = await addDoc(ventasCollection, venta);
      
      console.log("Venta guardada con ID:", docRef.id);
      

      Swal.fire({
        icon: "success",
        title: "¡Compra realizada con éxito!",
        html: `
          <p>Tu pedido ha sido procesado correctamente.</p>
          <p><strong>ID de orden:</strong> ${docRef.id}</p>
        `,
        confirmButtonColor: "#28a745",
        confirmButtonText: "Aceptar"
      });
      

    } catch (error) {
      console.error("Error al guardar la venta:", error);
      

      Swal.fire({
        icon: "error",
        title: "Error al procesar la compra",
        text: "Hubo un problema al procesar tu pedido. Por favor intenta de nuevo.",
        confirmButtonColor: "#d33",
        confirmButtonText: "Entendido"
      });
    } finally {
      setCargando(false);
    }
  };

  return (

    <div className="cart-container">
      <h2>TU <span>CARRITO</span></h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        
        <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Acción</p>
          </div>

          <ul className="cart-items">
            {carrito.map((producto) => {
              const totalPrecio = producto.precio * producto.cantidad;

              return (
                <li className="cart-item" key={producto.id}>
                  <div className="product-info">
                    <img 
                      src={producto.imagen || "https://via.placeholder.com/150"} 
                      alt={producto.nombre}
                      className="product-images"
                    />
                    <span>{producto.nombre}</span>
                  </div>
                  <p>${producto.precio.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleDisminuirCantidad(producto.id)}
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      className="quantity-input"
                      readOnly
                      value={producto.cantidad}
                    />
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleAumentarCantidad(producto.id)}
                    >
                      +
                    </button>
                  </div>

                  <p>${totalPrecio.toFixed(2)}</p>

                  <button 
                    className="delete-btn"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>               
                </li>
              );
            })}
          </ul>            
        </>
      )}

      <div className="cart-summary">
        <h2>TU <span>CARRITO</span></h2>
        <p>Total Parcial: <span>${subTotal.toFixed(2)}</span></p>
        <p>Tarifa de envío: <span>${costoDeEnvio.toFixed(2)}</span></p>
        <p className="total">Total: <span>${total.toFixed(2)}</span></p>
        <button 
          className="checkout-btn"
          onClick={handlePagar}
          disabled={cargando || carrito.length === 0}
        >
          {cargando ? "PROCESANDO..." : "PAGAR"}
        </button>
      </div>
      <Footer/>
    </div>
  );
};