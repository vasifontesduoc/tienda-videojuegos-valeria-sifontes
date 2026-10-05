import { useState } from "react";

// Valores iniciales del formulario (se usan también para limpiarlo).
const formularioVacio = {
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    imagen: "",
};

// Formulario para agregar un videojuego nuevo al catálogo.
// Recibe por props las categorías disponibles y la función onAgregar,
// que está en App y es la que realmente modifica el estado de la lista.
function AddGameForm({ categorias, onAgregar }) {
    // Estado con lo que el usuario va escribiendo (inputs controlados).
    const [datos, setDatos] = useState(formularioVacio);

    // Estado con los mensajes de error de cada campo.
    const [errores, setErrores] = useState({});

    // Mensaje de éxito que aparece después de agregar.
    const [mensajeExito, setMensajeExito] = useState("");

    // Una sola función para todos los inputs: usa el atributo "name"
    // para saber qué propiedad del objeto actualizar.
    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setDatos({ ...datos, [name]: value });
    }

    // Revisa cada campo y devuelve un objeto con los errores encontrados.
    function validar() {
        const nuevosErrores = {};

        if (datos.nombre.trim().length < 2) {
            nuevosErrores.nombre = "Ingresa el nombre del videojuego (mínimo 2 caracteres).";
        }
        if (datos.categoria === "") {
            nuevosErrores.categoria = "Selecciona una categoría.";
        }
        if (datos.precio === "" || Number(datos.precio) <= 0) {
            nuevosErrores.precio = "Ingresa un precio mayor a 0.";
        }
        if (datos.descripcion.trim().length < 10) {
            nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres.";
        }

        return nuevosErrores;
    }

    function manejarEnvio(evento) {
        // Evita que la página se recargue al enviar el formulario.
        evento.preventDefault();

        const erroresEncontrados = validar();
        setErrores(erroresEncontrados);

        // Si hay errores, no se agrega nada.
        if (Object.keys(erroresEncontrados).length > 0) {
            setMensajeExito("");
            return;
        }

        // Se arma el objeto con la misma forma que los de productos.json.
        onAgregar({
            nombre: datos.nombre.trim(),
            categoria: datos.categoria,
            precioNormal: Number(datos.precio),
            precioOferta: null,
            descripcion: datos.descripcion.trim(),
            // Si no se ingresa imagen, se usa una imagen por defecto.
            imagen: datos.imagen.trim() || "images/sin-imagen.svg",
        });

        setMensajeExito(`"${datos.nombre.trim()}" se agregó al catálogo.`);
        setDatos(formularioVacio);
    }

    return (
        <form className="card p-4" onSubmit={manejarEnvio} noValidate>
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

            <div className="grid-formulario">
                <div>
                    <label htmlFor="juegoNombre" className="form-label">Nombre</label>
                    <input
                        id="juegoNombre"
                        name="nombre"
                        type="text"
                        className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                        value={datos.nombre}
                        onChange={manejarCambio}
                    />
                    <div className="invalid-feedback">{errores.nombre}</div>
                </div>

                <div>
                    <label htmlFor="juegoCategoria" className="form-label">Categoría</label>
                    <select
                        id="juegoCategoria"
                        name="categoria"
                        className={`form-select ${errores.categoria ? "is-invalid" : ""}`}
                        value={datos.categoria}
                        onChange={manejarCambio}
                    >
                        <option value="">Selecciona...</option>
                        {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errores.categoria}</div>
                </div>

                <div>
                    <label htmlFor="juegoPrecio" className="form-label">Precio (CLP)</label>
                    <input
                        id="juegoPrecio"
                        name="precio"
                        type="number"
                        min="1"
                        className={`form-control ${errores.precio ? "is-invalid" : ""}`}
                        value={datos.precio}
                        onChange={manejarCambio}
                    />
                    <div className="invalid-feedback">{errores.precio}</div>
                </div>

                <div>
                    <label htmlFor="juegoImagen" className="form-label">
                        URL de imagen <small className="text-muted">(opcional)</small>
                    </label>
                    <input
                        id="juegoImagen"
                        name="imagen"
                        type="text"
                        className="form-control"
                        placeholder="https://..."
                        value={datos.imagen}
                        onChange={manejarCambio}
                    />
                </div>

                <div className="campo-completo">
                    <label htmlFor="juegoDescripcion" className="form-label">Descripción</label>
                    <textarea
                        id="juegoDescripcion"
                        name="descripcion"
                        rows="2"
                        className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
                        value={datos.descripcion}
                        onChange={manejarCambio}
                    ></textarea>
                    <div className="invalid-feedback">{errores.descripcion}</div>
                </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3 align-self-start">
                Agregar videojuego
            </button>
        </form>
    );
}

export default AddGameForm;
