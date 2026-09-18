/* ============================================================
VARIABLES GLOBALES
   ============================================================ */

let productos = [];   // Se llena al cargar el JSON
let carrito = [];     // Productos agregados por el usuario
let modalCarrito;     // Instancia del modal de Bootstrap

document.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
    modalCarrito = new bootstrap.Modal(document.getElementById("modalCarrito"));
    cargarProductos();
    configurarFormularioBusqueda();
    configurarCategorias();
}


/* ============================================================
1. FETCH API: carga de productos desde el JSON local
   ============================================================ */
async function cargarProductos() {
    const contenedor = document.getElementById("contenedorProductos");

    try {
        const respuesta = await fetch("assets/js/productos.json");

        if (!respuesta.ok) {
            throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        productos = await respuesta.json();
        renderizarProductos(productos);

    } catch (error) {
        contenedor.innerHTML = `
            <p class="text-danger text-center">
                No pudimos cargar el catálogo en este momento. Intenta nuevamente más tarde.
            </p>`;
        console.error("Error al cargar productos:", error);
    }
}

function renderizarProductos(lista) {
    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-muted">No se encontraron productos.</p>`;
        return;
    }

    lista.forEach((producto) => {
        contenedor.appendChild(crearCardProducto(producto));
    });
}

function crearCardProducto(producto) {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = `Portada de ${producto.nombre}`;
    imagen.className = "card-img-top";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body d-flex flex-column";

    const titulo = document.createElement("h3");
    titulo.className = "card-title h5";
    titulo.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.className = "card-text small text-muted";
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.className = "fw-bold";
    precio.textContent = `$${producto.precio.toLocaleString("es-CL")}`;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-tienda mt-auto";
    boton.textContent = "Agregar al carrito";
    boton.addEventListener("click", () => agregarAlCarrito(producto));

    cuerpo.append(titulo, descripcion, precio, boton);
    card.append(imagen, cuerpo);
    columna.appendChild(card);

    return columna;
}


/* ============================================================
2. EVENTO CLICK + MANIPULACIÓN DEL DOM: carrito de compras
Al agregar un producto, se actualiza el resumen Y se abre
automáticamente el modal para que el usuario vea el carrito.
   ============================================================ */
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarResumenCarrito();
    modalCarrito.show();
}

function actualizarResumenCarrito() {
    const lista = document.getElementById("listaCarrito");
    const mensajeVacio = document.getElementById("mensajeCarritoVacio");
    const totalEl = document.getElementById("totalCarrito");
    const contador = document.getElementById("contadorCarrito");

    lista.innerHTML = "";
    contador.textContent = carrito.length;

    if (carrito.length === 0) {
        mensajeVacio.style.display = "block";
        totalEl.textContent = "$0";
        return;
    }

    mensajeVacio.style.display = "none";

    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio;

        const item = document.createElement("li");
        const nombre = document.createElement("span");
        nombre.textContent = producto.nombre;
        const precio = document.createElement("span");
        precio.textContent = `$${producto.precio.toLocaleString("es-CL")}`;

        item.append(nombre, precio);
        lista.appendChild(item);
    });

    totalEl.textContent = `$${total.toLocaleString("es-CL")}`;
}


/* ============================================================
3. EVENTO SUBMIT: formulario de búsqueda
   ============================================================ */
function configurarFormularioBusqueda() {
    const formulario = document.getElementById("formBuscar");
    formulario.addEventListener("submit", manejarBusqueda);
}

function manejarBusqueda(evento) {
    evento.preventDefault();

    const termino = document.getElementById("inputBuscar").value.trim().toLowerCase();
    const mensaje = document.getElementById("mensajeBusqueda");

    if (termino === "") {
        renderizarProductos(productos);
        mensaje.textContent = "";
        return;
    }

    const resultados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(termino)
    );

    renderizarProductos(resultados);
    mensaje.textContent = `${resultados.length} resultado(s) para "${termino}".`;
}


/* ============================================================
4. CATEGORÍAS SIMULADAS EN LA NAVBAR
   ============================================================ */
function configurarCategorias() {
    const enlaces = document.querySelectorAll(".categoria-link");
    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", (evento) => {
            evento.preventDefault();

            enlaces.forEach((e) => e.classList.remove("activa"));
            evento.currentTarget.classList.add("activa");

            const categoria = evento.currentTarget.dataset.categoria;
            const filtrados = categoria === "todos"
                ? productos
                : productos.filter((p) => p.categoria === categoria);

            renderizarProductos(filtrados);
        });
    });
}