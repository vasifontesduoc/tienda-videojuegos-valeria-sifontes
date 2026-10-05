// Pie de página del sitio.
function Footer() {
    // Año actual calculado con JavaScript, así no hay que cambiarlo a mano.
    const anio = new Date().getFullYear();

    return (
        <footer className="footer py-4 mt-5">
            <div className="container footer-contenido">
                <p className="mb-0">© {anio} Tienda de Videojuegos · Valeria Sifontes</p>
                <p className="mb-0 text-muted">Desarrollo Frontend I · Duoc UC</p>
            </div>
        </footer>
    );
}

export default Footer;
