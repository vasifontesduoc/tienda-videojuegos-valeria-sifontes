// Muestra el carrito: la lista de productos agregados, el contador
// total y el precio total.
function Cart({ carrito, onQuitar }) {
    const totalItems = carrito.length;
    const totalPrecio = carrito.reduce((suma, producto) => {
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
                {/* Renderizado condicional: mensaje de carrito vacío o lista */}
                {carrito.length === 0 ? (
                    <p className="text-muted mb-0">Tu carrito está vacío.</p>
                ) : (
                    <ul className="list-group list-group-flush mb-3">
                        {carrito.map((producto) => (
                            <li
                                key={producto.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <div>{producto.nombre}</div>
                                    <small className="text-muted">
                                        ${(producto.precioOferta ?? producto.precioNormal).toLocaleString("es-CL")}
                                    </small>
                                </div>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onQuitar(producto.id)}
                                >
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

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