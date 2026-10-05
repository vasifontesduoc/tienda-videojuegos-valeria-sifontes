import { useState } from "react";

// Barra de navegación de la tienda. Recibe por props la cantidad de
// productos en el carrito para mostrarla en el contador.
function Navbar({ cantidadCarrito }) {
    // Estado local: controla si el menú está abierto en pantallas pequeñas
    // (el botón "hamburguesa" de Bootstrap).
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Cierra el menú al hacer clic en un enlace (útil en celulares).
    function cerrarMenu() {
        setMenuAbierto(false);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top px-3 py-3">
            <div className="container">
                <a className="navbar-brand" href="#inicio" onClick={cerrarMenu}>
                    🎮 Tienda de Videojuegos
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="menuPrincipal"
                    aria-expanded={menuAbierto}
                    aria-label="Abrir menú de navegación"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Si menuAbierto es true se agrega la clase "show" de Bootstrap */}
                <div
                    id="menuPrincipal"
                    className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
                >
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#inicio" onClick={cerrarMenu}>
                                Inicio
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#catalogo" onClick={cerrarMenu}>
                                Catálogo
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#agregar" onClick={cerrarMenu}>
                                Agregar juego
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contacto" onClick={cerrarMenu}>
                                Contacto
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbar-cart" href="#carrito" onClick={cerrarMenu}>
                                🛒 <span className="badge bg-primary ms-1">{cantidadCarrito}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
