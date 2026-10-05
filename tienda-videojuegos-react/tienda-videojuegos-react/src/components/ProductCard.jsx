import { useState } from "react";

// Muestra la información de un producto individual.
function ProductCard({ producto, enCarrito, onAlternar, onEliminar }) {
    const tieneOferta = producto.precioOferta !== null;

    // Estado local, propio de esta tarjeta: controla si se muestra el
    // detalle extra (la categoría) o no. Es independiente del carrito.
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>

                    {/* Renderizado condicional: solo aparece si mostrarDetalle es true */}
                    {mostrarDetalle && (
                        <p className="text-muted small mb-2">
                            Categoría: {producto.categoria}
                        </p>
                    )}

                    {/* Botón "Ver más" / "Ver menos": cambia su propio texto al
              hacer clic, usando el estado local mostrarDetalle. */}
                    <button
                        className="btn btn-link btn-sm p-0 mb-2 text-start"
                        onClick={() => setMostrarDetalle(!mostrarDetalle)}
                    >
                        {mostrarDetalle ? "Ver menos" : "Ver más"}
                    </button>

                    <div className="mt-auto">
                        {tieneOferta ? (
                            <p className="mb-2">
                                <span className="text-decoration-line-through text-muted me-2">
                                    ${producto.precioNormal.toLocaleString("es-CL")}
                                </span>
                                <span className="fw-bold text-danger">
                                    ${producto.precioOferta.toLocaleString("es-CL")}
                                </span>
                            </p>
                        ) : (
                            <p className="mb-2 fw-bold">
                                ${producto.precioNormal.toLocaleString("es-CL")}
                            </p>
                        )}

                        {/* Renderizado condicional: el texto y el color del botón
                cambian según si el producto ya está en el carrito. */}
                        <button
                            className={
                                enCarrito
                                    ? "btn btn-success w-100"
                                    : "btn btn-primary w-100"
                            }
                            onClick={() => onAlternar(producto)}
                        >
                            {enCarrito ? "En el carrito ✓" : "Agregar al carrito"}
                        </button>

                        {/* Elimina el videojuego del catálogo (lo maneja App con el estado) */}
                        <button
                            className="btn btn-outline-danger btn-sm w-100 mt-2"
                            onClick={() => onEliminar(producto.id)}
                        >
                            Eliminar del catálogo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;