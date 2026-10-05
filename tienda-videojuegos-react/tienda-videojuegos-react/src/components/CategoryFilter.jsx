// Botones para filtrar el catálogo por categoría.
// No guarda estado propio: la categoría seleccionada vive en App y llega
// por props. Al hacer clic, avisa a App con la función onSeleccionar.
function CategoryFilter({ categorias, categoriaSeleccionada, onSeleccionar }) {
    return (
        <div className="filtros mb-4" role="group" aria-label="Filtrar por categoría">
            {/* Botón para ver todos los juegos */}
            <button
                type="button"
                className={categoriaSeleccionada === "todas" ? "btn btn-primary" : "btn btn-outline-light"}
                onClick={() => onSeleccionar("todas")}
            >
                Todas
            </button>

            {/* Un botón por cada categoría que exista en la lista */}
            {categorias.map((categoria) => (
                <button
                    key={categoria}
                    type="button"
                    className={categoriaSeleccionada === categoria ? "btn btn-primary" : "btn btn-outline-light"}
                    onClick={() => onSeleccionar(categoria)}
                >
                    {/* Primera letra en mayúscula: "nintendo" -> "Nintendo" */}
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
