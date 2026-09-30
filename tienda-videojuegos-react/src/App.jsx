import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  // Estado del catálogo: empieza vacío y se llena cuando useEffect
  // termina de "cargar" los productos (simulando una API).
  const [productos, setProductos] = useState([]);

  // Estado de carga: true mientras esperamos los datos.
  const [cargando, setCargando] = useState(true);

  // Estado del carrito: arreglo con los productos agregados.
  const [carrito, setCarrito] = useState([]);

  // useEffect con arreglo de dependencias vacío [] = se ejecuta
  // una sola vez, cuando el componente se monta por primera vez.
  useEffect(() => {
    fetch("productos.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        // Pequeño retraso artificial para simular una carga real
        // desde una API externa (así se alcanza a ver "Cargando...").
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 800);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        setCargando(false);
      });
  }, []);

  // Agrega o quita un producto del carrito según si ya está en él.
  // Al unificar ambas acciones en una función, evitamos duplicar código.
  function alternarCarrito(producto) {
    const yaEsta = carrito.some((p) => p.id === producto.id);
    if (yaEsta) {
      setCarrito(carrito.filter((p) => p.id !== producto.id));
    } else {
      setCarrito([...carrito, producto]);
    }
  }

  // Quita un producto del carrito a partir de su id (lo usa el botón
  // "Quitar" dentro del panel del carrito).
  function quitarDelCarrito(id) {
    setCarrito(carrito.filter((p) => p.id !== id));
  }

  // Lista simple con los ids de los productos que están en el carrito,
  // para que cada tarjeta sepa si debe mostrar "Agregar" o "En el carrito".
  const idsEnCarrito = carrito.map((p) => p.id);

  return (
    <>
      <nav className="navbar navbar-dark px-4 py-3 mb-4">
        <span className="navbar-brand mb-0">🎮 Tienda de Videojuegos</span>
        <span className="navbar-cart">
          🛒 <span className="badge bg-primary ms-1">{idsEnCarrito.length}</span>
        </span>
      </nav>

      <div className="container mb-4">
        <div className="row">
          {/* Columna del catálogo */}
          <div className="col-lg-8">
            <ProductList
              productos={productos}
              cargando={cargando}
              idsEnCarrito={idsEnCarrito}
              onAlternar={alternarCarrito}
            />
          </div>

          {/* Columna del carrito */}
          <div className="col-lg-4">
            <Cart carrito={carrito} onQuitar={quitarDelCarrito} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;