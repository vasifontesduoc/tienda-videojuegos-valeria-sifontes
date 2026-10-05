# 🎮 Tienda de Videojuegos — React + Bootstrap 5

Proyecto de la **Evaluación Final Transversal** de Desarrollo Frontend I (PFY2201), Duoc UC.

**Autora:** Valeria Sifontes

Sitio web de una tienda de videojuegos online. Muestra el catálogo en tarjetas, permite filtrar por categoría, agregar y eliminar videojuegos, armar un carrito y enviar un formulario de contacto con validación.

## Tecnologías utilizadas

- **HTML5** con etiquetas semánticas (`header`, `nav`, `main`, `section`, `aside`, `footer`)
- **CSS3**: estilos propios con variables, **Flexbox** (portada, filtros, footer) y **CSS Grid** (formularios y sección de contacto)
- **Bootstrap 5**: barra de navegación, tarjetas, grilla responsiva, formularios y alertas
- **JavaScript (ES6+)**: arreglos de objetos, `fetch`, `map`, `filter`, `reduce` y validaciones
- **React 19** con **Vite**: componentes, `useState`, `useEffect` y props

## Funcionalidades

- **Catálogo dinámico:** los videojuegos se cargan desde `public/productos.json` usando `fetch` y se muestran en tarjetas con imagen, nombre, precio y descripción.
- **Filtro por categoría:** botones para ver Todas, Nintendo, PlayStation, Xbox o Multiplataforma.
- **Agregar videojuegos:** un formulario validado agrega juegos nuevos al catálogo, guardados en el estado.
- **Eliminar videojuegos:** cada tarjeta tiene un botón para quitar el juego del catálogo.
- **Carrito:** permite agregar y quitar productos, y muestra el contador y el total en pesos chilenos.
- **Formulario de contacto:** valida el nombre, el email (formato) y el mensaje, y muestra mensajes de error bajo cada campo.
- **Diseño responsivo:** se adapta a celular, tablet y escritorio, con menú hamburguesa en pantallas pequeñas.

## Estructura del proyecto

```
tienda-videojuegos-react/
├── index.html              # HTML base (carga Bootstrap 5 y las fuentes)
├── package.json            # Dependencias y scripts
├── vite.config.js          # Configuración de Vite
├── public/
│   ├── productos.json      # Datos de los videojuegos (arreglo de objetos)
│   └── images/             # Portadas de los juegos
└── src/
    ├── main.jsx            # Punto de entrada: monta <App /> en el HTML
    ├── App.jsx             # Componente principal: guarda el estado y lo reparte por props
    ├── App.css             # Estilos personalizados (Flexbox y Grid)
    ├── index.css           # Estilos base
    └── components/
        ├── Navbar.jsx          # Barra de navegación con contador del carrito
        ├── CategoryFilter.jsx  # Botones de filtro por categoría
        ├── ProductList.jsx     # Lista de videojuegos (recibe la lista filtrada)
        ├── ProductCard.jsx     # Tarjeta de un videojuego
        ├── Cart.jsx            # Carrito con el total
        ├── AddGameForm.jsx     # Formulario para agregar videojuegos
        ├── ContactForm.jsx     # Formulario de contacto con validación
        └── Footer.jsx          # Pie de página
```

### ¿Cómo se conectan los componentes?

`App` es el componente "padre" y guarda los estados principales: `productos`, `carrito` y `categoriaSeleccionada`. Esos datos, junto con las funciones que los modifican, se envían a los componentes hijos mediante **props**.

Por ejemplo, cuando el usuario hace clic en un botón de `CategoryFilter`, se llama a `setCategoriaSeleccionada`. Entonces `App` vuelve a calcular `productosFiltrados` y se los pasa a `ProductList`, que muestra solo esos juegos.

## Instalación y uso

### Requisitos

- [Node.js](https://nodejs.org/) versión 20 o superior (incluye npm)
- Git

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/vasifontesduoc/tienda-videojuegos-valeria-sifontes.git
   ```
2. Entrar a la carpeta del proyecto React:
   ```bash
   cd tienda-videojuegos-valeria-sifontes/tienda-videojuegos-react
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir en el navegador la dirección que aparece en la terminal (por ejemplo `http://localhost:5173/tienda-videojuegos-valeria-sifontes/tienda-videojuegos-react/`).

### Otros comandos

| Comando           | Descripción                                       |
| ----------------- | ------------------------------------------------- |
| `npm run build`   | Genera la versión de producción en la carpeta `dist/` |
| `npm run preview` | Muestra localmente la versión de producción       |
| `npm run deploy`  | Publica el sitio en GitHub Pages                  |

## Cómo usar el sitio

1. **Inicio:** desde la portada, el botón "Ver catálogo" lleva a los productos.
2. **Filtrar:** elige una categoría con los botones sobre el catálogo.
3. **Carrito:** usa "Agregar al carrito" en una tarjeta y el carrito se actualiza a la derecha (o abajo en celular).
4. **Agregar juego:** completa el formulario de la sección "Agregar videojuego". Si falta un dato, aparece un mensaje de error.
5. **Eliminar juego:** presiona "Eliminar del catálogo" en la tarjeta.
6. **Contacto:** completa nombre, email y mensaje. Si un dato falta o está mal escrito, el formulario muestra qué corregir.

> Nota: los juegos que agregas o eliminas se guardan en el estado de React, así que al recargar la página el catálogo vuelve al contenido original de `productos.json`.
