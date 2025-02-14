$(document).ready(function () {
    // Redirigir al usuario al hacer clic en los botones
    $("#btn-plantaciones").on("click", function () {
        window.location.href = "plantaciones.html"; // Redirige a la página de plantaciones
    });

    $("#btn-limpiezas").on("click", function () {
        window.location.href = "limpiezas.html"; // Redirige a la página de limpiezas
    });
});

$(document).ready(function () {
    const apiUrl = 'http://localhost/DWES/UD04/TE/public';
    new LimpiezaController(apiUrl);
});
