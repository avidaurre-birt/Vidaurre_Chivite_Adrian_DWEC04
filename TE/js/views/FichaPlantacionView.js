class FichaPlantacionView {
    constructor() {
        this.elementos = {
            ubicacion: $('#ubicacion'),
            fecha: $('#fecha'),
            participantes: $('#participantes'),
            descripcion: $('#descripcion'),
            arboles: $('#arboles-lista'),
            imagen: $('#imagen')
        };
    }

    mostrarPlantacion(plantacion) {
        this.elementos.ubicacion.text(plantacion.ubicacion);
        this.elementos.fecha.text(plantacion.fecha_plantacion);
        this.elementos.participantes.text(plantacion.participantes);
        this.elementos.descripcion.text(plantacion.descripcion || 'No hay descripción disponible.');
        this.mostrarArboles(plantacion.arboles);
        this.elementos.imagen.attr('src', './img/echarri_2.jpg');
    }

    mostrarArboles(arboles) {
        this.elementos.arboles.empty();

        arboles.forEach(arbol => {
            this.elementos.arboles.append(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${arbol.especie}</span>
            <span class="badge bg-success rounded-pill">${arbol.cantidad}</span>
          </li>
        `);
        });
    }

    mostrarError(mensaje) {
        $('#ficha-container').html(`
          <div class="alert alert-danger mt-4">
            ${mensaje}
          </div>
        `);
    }
}

window.FichaPlantacionView = FichaPlantacionView;   