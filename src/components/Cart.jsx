// Componente que muestra el carrito de compras: la lista de productos
// agregados, el contador total y el precio total.
function Cart({ carrito, onQuitar }) {
    // Estos valores se recalculan en cada render a partir del carrito,
    // no necesitan su propio estado porque dependen directamente de "carrito".
    const totalItems = carrito.length;
    const totalPrecio = carrito.reduce((suma, producto) => {
        // Si el producto tiene oferta, se usa ese precio; si no, el precio normal.
        const precio = producto.precioOferta ?? producto.precioNormal;
        return suma + precio;
    }, 0);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <span>Carrito</span>
                <span className="badge bg-primary">{totalItems}</span>
            </div>

            <div className="card-body">
                {/* Renderizado condicional: mensaje de carrito vacío o lista de productos */}
                {carrito.length === 0 ? (
                    <p className="text-muted mb-0">Tu carrito está vacío.</p>
                ) : (
                    <ul className="list-group list-group-flush mb-3">
                        {carrito.map((producto, indice) => (
                            <li
                                key={indice}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <div>{producto.nombre}</div>
                                    <small className="text-muted">
                                        ${(producto.precioOferta ?? producto.precioNormal).toLocaleString("es-CL")}
                                    </small>
                                </div>
                                {/* Evento onClick: al hacer clic, se quita este producto usando su índice */}
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onQuitar(indice)}
                                >
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* El total solo se muestra si hay al menos un producto en el carrito */}
                {carrito.length > 0 && (
                    <p className="fw-bold mb-0">
                        Total: ${totalPrecio.toLocaleString("es-CL")}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Cart;