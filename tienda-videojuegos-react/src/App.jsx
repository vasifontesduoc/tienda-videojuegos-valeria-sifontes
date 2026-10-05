import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AddGameForm from "./components/AddGameForm";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import "./App.css";

// Categorías disponibles en la tienda se usan en el filtro y en el
// formulario para agregar videojuegos
const CATEGORIAS = ["nintendo", "playstation", "xbox", "multiplataforma"];

function App() {
  // Estado del catálogo: empieza vacío y se llena cuando useEffect
  // termina de cargar los productos (simulando una API)
  const [productos, setProductos] = useState([]);

  // Estado de carga: true mientras esperamos los datos
  const [cargando, setCargando] = useState(true);

  // Estado del carrito: arreglo con los productos agregados
  const [carrito, setCarrito] = useState([]);

  // Estado del filtro: guarda la categoría elegida ("todas" = sin filtro)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  // useEffect con arreglo de dependencias vacío [] = se ejecuta
  // una sola vez, cuando el componente se monta por primera vez
  useEffect(() => {
    fetch("productos.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        // Pequeño retraso artificial para simular una carga real
        // desde una API externa (así se alcanza a ver "Cargando...")
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

  // Lista que se muestra en pantalla: si la categoría es "todas" se
  // muestran todos; si no, solo los de esa categoría. No es un estado
  // nuevo: se calcula a partir de productos + categoriaSeleccionada
  const productosFiltrados =
    categoriaSeleccionada === "todas"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  // Agrega o quita un producto del carrito según si ya está en él
  // Al unificar ambas acciones en una función, evitamos duplicar código
  function alternarCarrito(producto) {
    const yaEsta = carrito.some((p) => p.id === producto.id);
    if (yaEsta) {
      setCarrito(carrito.filter((p) => p.id !== producto.id));
    } else {
      setCarrito([...carrito, producto]);
    }
  }

  // Quita un producto del carrito a partir de su id (lo usa el botón
  // "Quitar" dentro del panel del carrito)
  function quitarDelCarrito(id) {
    setCarrito(carrito.filter((p) => p.id !== id));
  }

  // Agrega un videojuego nuevo al catálogo (lo llama AddGameForm).
  // Date.now() entrega un número único que usamos como id
  function agregarVideojuego(nuevoJuego) {
    const juegoConId = { ...nuevoJuego, id: Date.now() };
    setProductos([...productos, juegoConId]);
  }

  // Elimina un videojuego del catálogo (lo llama cada ProductCard).
  // También lo sacamos del carrito para que no quede un producto "fantasma"
  function eliminarVideojuego(id) {
    setProductos(productos.filter((p) => p.id !== id));
    setCarrito(carrito.filter((p) => p.id !== id));
  }

  // Lista simple con los ids de los productos que están en el carrito,
  // para que cada tarjeta sepa si debe mostrar "Agregar" o "En el carrito"
  const idsEnCarrito = carrito.map((p) => p.id);

  return (
    <>
      <header>
        <Navbar cantidadCarrito={carrito.length} />
      </header>

      <main>
        {/* Portada / Inicio */}
        <section id="inicio" className="hero">
          <div className="container hero-contenido">
            <h1>Tienda de Videojuegos</h1>
            <p className="hero-texto">
              Los mejores juegos para Nintendo, PlayStation, Xbox y más.
              Filtra por categoría y arma tu carrito.
            </p>
            <a href="#catalogo" className="btn btn-primary btn-lg">
              Ver catálogo
            </a>
          </div>
        </section>

        {/* Catálogo + carrito */}
        <section id="catalogo" className="container py-5">
          <h2 className="titulo-seccion">Catálogo</h2>

          <CategoryFilter
            categorias={CATEGORIAS}
            categoriaSeleccionada={categoriaSeleccionada}
            onSeleccionar={setCategoriaSeleccionada}
          />

          <div className="row g-4">
            {/* Columna del catálogo */}
            <div className="col-lg-8">
              <ProductList
                productos={productosFiltrados}
                cargando={cargando}
                idsEnCarrito={idsEnCarrito}
                onAlternar={alternarCarrito}
                onEliminar={eliminarVideojuego}
              />
            </div>

            {/* Columna del carrito */}
            <aside id="carrito" className="col-lg-4">
              <div className="carrito-fijo">
                <Cart carrito={carrito} onQuitar={quitarDelCarrito} />
              </div>
            </aside>
          </div>
        </section>

        {/* Formulario para agregar videojuegos */}
        <section id="agregar" className="container py-5">
          <h2 className="titulo-seccion">Agregar videojuego</h2>
          <AddGameForm categorias={CATEGORIAS} onAgregar={agregarVideojuego} />
        </section>

        {/* Contacto */}
        <section id="contacto" className="container py-5">
          <h2 className="titulo-seccion">Contacto</h2>
          <div className="grid-contacto">
            <div>
              <p>
                ¿Tienes dudas sobre un pedido o quieres sugerir un juego?
                Escríbenos y el administrador del sitio te responderá.
              </p>
              <ul className="list-unstyled text-muted">
                <li>📍 Santiago, Chile</li>
                <li>✉️ contacto@tiendavideojuegos.cl</li>
                <li>🕒 Lunes a viernes, 9:00 a 18:00</li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
