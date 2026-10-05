import ProductCard from "./ProductCard";

// Muestra el catálogo. Recibe la lista YA filtrada desde App por props.
// Mientras "cargando" es true, muestra un mensaje en vez de las tarjetas
// (renderizado condicional).
function ProductList({ productos, cargando, idsEnCarrito, onAlternar, onEliminar }) {
    if (cargando) {
        return <p className="text-center text-muted">Cargando productos...</p>;
    }

    // Si el filtro no encuentra juegos (o se eliminaron todos), avisamos.
    if (productos.length === 0) {
        return (
            <p className="text-center text-muted">
                No hay videojuegos en esta categoría.
            </p>
        );
    }

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {productos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    producto={producto}
                    enCarrito={idsEnCarrito.includes(producto.id)}
                    onAlternar={onAlternar}
                    onEliminar={onEliminar}
                />
            ))}
        </div>
    );
}

export default ProductList;
