import ProductCard from "./ProductCard";

// Muestra el catálogo completo. Mientras "cargando" es true, muestra un
// mensaje en vez de las tarjetas (renderizado condicional).
function ProductList({ productos, cargando, idsEnCarrito, onAlternar }) {
    if (cargando) {
        return <p className="text-center text-muted">Cargando productos...</p>;
    }

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {productos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    producto={producto}
                    enCarrito={idsEnCarrito.includes(producto.id)}
                    onAlternar={onAlternar}
                />
            ))}
        </div>
    );
}

export default ProductList;