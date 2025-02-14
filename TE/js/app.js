$(document).ready(() => {
    const apiUrl = 'http://localhost/DWES/UD04/TE/public';

    // Inicializar resumen
    new ResumenController(apiUrl);

    // Manejo de navegación
    $('#btn-plantaciones').click(() => window.location.href = 'plantaciones.html');
    $('#btn-limpiezas').click(() => window.location.href = 'limpiezas.html');
});