// Componente que muestra la información de un solo producto.
// Recibe el producto y una función (onAgregar) que avisa a App
// cuando el usuario quiere agregarlo al carrito.
function ProductCard({ producto, onAgregar }) {
    // Renderizado condicional: si el producto tiene precio de oferta,
    // se muestran ambos precios; si no, solo el precio normal.
    const tieneOferta = producto.precioOferta !== null;

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

                    <div className="mt-auto">
                        {tieneOferta ? (
                            // Caso con oferta: precio normal tachado + precio oferta destacado
                            <p className="mb-2">
                                <span className="text-decoration-line-through text-muted me-2">
                                    ${producto.precioNormal.toLocaleString("es-CL")}
                                </span>
                                <span className="fw-bold text-danger">
                                    ${producto.precioOferta.toLocaleString("es-CL")}
                                </span>
                            </p>
                        ) : (
                            // Caso sin oferta: solo se muestra el precio normal
                            <p className="mb-2 fw-bold">
                                ${producto.precioNormal.toLocaleString("es-CL")}
                            </p>
                        )}

                        {/* Evento onClick: al hacer clic, se llama a onAgregar con este producto */}
                        <button
                            className="btn btn-primary w-100"
                            onClick={() => onAgregar(producto)}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;