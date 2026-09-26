import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  // Estado global del carrito: un arreglo con los productos agregados.
  // Empieza vacío y se actualiza cada vez que se agrega o quita un producto.
  const [carrito, setCarrito] = useState([]);

  // Agrega un producto al carrito, creando un nuevo arreglo
  // (en React nunca se modifica el estado directamente).
  function agregarAlCarrito(producto) {
    setCarrito([...carrito, producto]);
  }

  // Quita un producto del carrito según su posición (índice) en el arreglo.
  function quitarDelCarrito(indice) {
    setCarrito(carrito.filter((_, i) => i !== indice));
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">Tienda de Videojuegos</h1>

      <div className="row">
        {/* Columna del catálogo: recibe la función para agregar productos */}
        <div className="col-lg-8">
          <ProductList onAgregar={agregarAlCarrito} />
        </div>

        {/* Columna del carrito: recibe el estado actual y la función para quitar */}
        <div className="col-lg-4">
          <Cart carrito={carrito} onQuitar={quitarDelCarrito} />
        </div>
      </div>
    </div>
  );
}

export default App;
