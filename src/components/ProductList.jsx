import ProductCard from "./ProductCard";
import { productos } from "../data/productos";

// Componente que arma el catálogo completo, recorriendo el arreglo de
// productos y creando una tarjeta (ProductCard) por cada uno.
function ProductList({ onAgregar }) {
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {productos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    producto={producto}
                    onAgregar={onAgregar}
                />
            ))}
        </div>
    );
}

export default ProductList;