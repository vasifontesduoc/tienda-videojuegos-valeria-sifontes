import { useState } from "react";

// Expresión regular simple para revisar el formato del email:
// texto + @ + texto + . + texto (sin espacios).
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Formulario de contacto con nombre, email y mensaje.
// Valida los datos antes de "enviarlos" y muestra errores en cada campo.
function ContactForm() {
    const [datos, setDatos] = useState({ nombre: "", email: "", mensaje: "" });
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setDatos({ ...datos, [name]: value });
    }

    function validar() {
        const nuevosErrores = {};

        if (datos.nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        } else if (datos.nombre.trim().length < 3) {
            nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
        }

        if (datos.email.trim() === "") {
            nuevosErrores.email = "El email es obligatorio.";
        } else if (!regexEmail.test(datos.email.trim())) {
            nuevosErrores.email = "Ingresa un email válido, por ejemplo: nombre@correo.cl";
        }

        if (datos.mensaje.trim() === "") {
            nuevosErrores.mensaje = "El mensaje es obligatorio.";
        } else if (datos.mensaje.trim().length < 10) {
            nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
        }

        return nuevosErrores;
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const erroresEncontrados = validar();
        setErrores(erroresEncontrados);

        if (Object.keys(erroresEncontrados).length > 0) {
            setEnviado(false);
            return;
        }

        // No hay servidor, así que simulamos el envío: mostramos un mensaje
        // de confirmación y limpiamos el formulario.
        setEnviado(true);
        setDatos({ nombre: "", email: "", mensaje: "" });
    }

    return (
        <form className="card p-4" onSubmit={manejarEnvio} noValidate>
            {enviado && (
                <div className="alert alert-success">
                    ¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="contactoNombre" className="form-label">Nombre</label>
                <input
                    id="contactoNombre"
                    name="nombre"
                    type="text"
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                    value={datos.nombre}
                    onChange={manejarCambio}
                />
                <div className="invalid-feedback">{errores.nombre}</div>
            </div>

            <div className="mb-3">
                <label htmlFor="contactoEmail" className="form-label">Email</label>
                <input
                    id="contactoEmail"
                    name="email"
                    type="email"
                    className={`form-control ${errores.email ? "is-invalid" : ""}`}
                    value={datos.email}
                    onChange={manejarCambio}
                />
                <div className="invalid-feedback">{errores.email}</div>
            </div>

            <div className="mb-3">
                <label htmlFor="contactoMensaje" className="form-label">Mensaje</label>
                <textarea
                    id="contactoMensaje"
                    name="mensaje"
                    rows="4"
                    className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
                    value={datos.mensaje}
                    onChange={manejarCambio}
                ></textarea>
                <div className="invalid-feedback">{errores.mensaje}</div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Enviar mensaje
            </button>
        </form>
    );
}

export default ContactForm;
