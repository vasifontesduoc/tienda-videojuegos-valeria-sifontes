/* ============================================================
Manipulación del DOM, eventos (click, mouseover, submit)
   ============================================================ */

// Se espera a que todo el HTML esté cargado antes de ejecutar
// cualquier función que dependa de elementos del DOM.
document.addEventListener("DOMContentLoaded", inicializarSitio);

function inicializarSitio() {
    configurarBotonesDetalle();
    configurarEfectoMouseover();
    configurarFormularioNewsletter();
    cargarProductosDesdeAPI();
}


/* ============================================================
1. EVENTO CLICK + MANIPULACIÓN DEL DOM
Cada botón "Ver detalle" muestra u oculta un párrafo con la
plataforma y el precio del juego. Ese párrafo no existe en el
HTML original: se crea la primera vez con createElement.
   ============================================================ */
function configurarBotonesDetalle() {
    const botones = document.querySelectorAll(".btn-ver-detalle");
    botones.forEach((boton) => {
        boton.addEventListener("click", manejarClickDetalle);
    });
}

function manejarClickDetalle(evento) {
    const boton = evento.currentTarget;
    const card = boton.closest(".card");
    let detalle = card.querySelector(".detalle-extra");

    // Primera vez que se hace clic: se crea el elemento dinámicamente
    // y se muestra de inmediato (no requiere alternar nada).
    if (!detalle) {
        const plataforma = card.dataset.plataforma;
        const precio = card.dataset.precio;

        detalle = document.createElement("p");
        detalle.classList.add("detalle-extra", "small", "text-muted", "mt-2");
        detalle.textContent = `Plataforma: ${plataforma} · Precio: ${precio}`;
        detalle.style.display = "block";

        // Se inserta el nuevo párrafo justo antes del botón.
        card.querySelector(".card-body").insertBefore(detalle, boton);
        boton.textContent = "Ocultar detalle";
        return;
    }

    // Clics siguientes: el elemento ya existe, solo se alterna su visibilidad.
    const detalleVisible = detalle.style.display !== "none";
    detalle.style.display = detalleVisible ? "none" : "block";
    boton.textContent = detalleVisible ? "Ver detalle" : "Ocultar detalle";
}


/* ============================================================
2. EVENTO MOUSEOVER / MOUSEOUT
Al pasar el mouse sobre una card de producto, se resalta con
una clase CSS y se agrega dinámicamente una etiqueta "Popular".
Al sacar el mouse todo vuelve a su estado original
   ============================================================ */
function configurarEfectoMouseover() {
    const cards = document.querySelectorAll("#productos .card");
    cards.forEach((card) => {
        card.addEventListener("mouseover", () => resaltarCard(card, true));
        card.addEventListener("mouseout", () => resaltarCard(card, false));
    });
}

function resaltarCard(card, activar) {
    if (activar) {
        card.classList.add("card-resaltada");

        // Evita crear la etiqueta más de una vez si el mouse
        // se mueve rápido dentro de la misma card.
        if (!card.querySelector(".badge-popular")) {
            const etiqueta = document.createElement("span");
            etiqueta.classList.add("badge-popular");
            etiqueta.textContent = "🔥 Popular";
            card.appendChild(etiqueta);
        }
    } else {
        card.classList.remove("card-resaltada");
        const etiqueta = card.querySelector(".badge-popular");
        if (etiqueta) {
            etiqueta.remove();
        }
    }
}


/* ============================================================
3. EVENTO SUBMIT + VALIDACIÓN + MANIPULACIÓN DEL DOM
Valida el correo ingresado en el formulario de newsletter.
Si es válido, agrega dinámicamente el correo a una lista de
"suscriptores" y muestra un mensaje de confirmación.
   ============================================================ */
function configurarFormularioNewsletter() {
    const formulario = document.getElementById("formNewsletter");
    formulario.addEventListener("submit", manejarSubmitNewsletter);
}

function manejarSubmitNewsletter(evento) {
    // Evita que el formulario recargue la página al enviarse.
    evento.preventDefault();

    const inputEmail = document.getElementById("emailNewsletter");
    const mensaje = document.getElementById("mensajeNewsletter");
    const email = inputEmail.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        mensaje.textContent = "Ingresa un correo electrónico válido para suscribirte.";
        mensaje.className = "mt-2 text-warning";
        return;
    }

    // Correo válido: se agrega como nuevo elemento <li> a la lista.
    const lista = document.getElementById("listaSuscriptores");
    const nuevoItem = document.createElement("li");
    nuevoItem.textContent = `✔ ${email}`;
    lista.appendChild(nuevoItem);

    mensaje.textContent = `¡Gracias! ${email} fue agregado a nuestra lista de novedades.`;
    mensaje.className = "mt-2 text-success";

    formulario.reset ? formulario.reset() : evento.target.reset();
}


/* ============================================================
4. FETCH API + PROMESAS + MANIPULACIÓN DEL DOM
Carga productos desde una API pública (Fake Store API) y los
agrega dinámicamente al DOM. Si la petición falla, se informa
el error tanto en pantalla como en la consola.
   ============================================================ */
async function cargarProductosDesdeAPI() {
    const contenedor = document.getElementById("contenedorProductosApi");

    try {
        const respuesta = await fetch("https://fakestoreapi.com/products/category/electronics?limit=3");

        if (!respuesta.ok) {
            throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        // Se limpia el mensaje de "Cargando..." antes de mostrar los datos.
        contenedor.innerHTML = "";

        productos.forEach((producto) => {
            contenedor.appendChild(crearCardProductoApi(producto));
        });

    } catch (error) {
        contenedor.innerHTML = `
            <p class="text-danger text-center">
                No se pudieron cargar los productos externos. Intenta nuevamente más tarde.
            </p>`;
        console.error("Error al cargar productos desde la API:", error);
    }
}

// Construye dinámicamente una card de Bootstrap a partir de un
// producto obtenido de la API usando createElement/appendChild
function crearCardProductoApi(producto) {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";

    const imagen = document.createElement("img");
    imagen.src = producto.image;
    imagen.alt = producto.title;
    imagen.className = "card-img-top p-3";
    imagen.style.height = "220px";
    imagen.style.objectFit = "contain";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body d-flex flex-column";

    const titulo = document.createElement("h3");
    titulo.className = "card-title h6";
    titulo.textContent = producto.title;

    const precio = document.createElement("p");
    precio.className = "card-text fw-bold mt-auto";
    const tasaCambioUsdClp = 950;
    const precioEnClp = Math.round(producto.price * tasaCambioUsdClp);
    precio.textContent = `$${precioEnClp.toLocaleString("es-CL")}`;
    cuerpo.append(titulo, precio);
    card.append(imagen, cuerpo);
    columna.appendChild(card);

    return columna;
}