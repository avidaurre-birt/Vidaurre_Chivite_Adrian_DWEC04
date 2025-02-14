class PlantacionesView {
  constructor() {
    this.container = $('#plantaciones-container');
    this.totalArbolesContainer = $('#total-arboles');
  }

  mostrarPlantaciones(plantaciones) {
    this.container.empty();

    if (plantaciones.length === 0) {
      this.container.append('<p>No se encontraron plantaciones para mostrar.</p>');
      return;
    }

    plantaciones.forEach(plantacion => {
      this.container.append(`
                            <div class="plantacion-card">
                                <h3>${plantacion.ubicacion}</h3>
                                <p><strong>Fecha:</strong> ${plantacion.fecha_plantacion}</p>
                                <button class="ver-ficha" data-id="${plantacion.id_plantacion}">Ver Ficha Completa</button>
                            </div>
        `);
    });

  }

  /*mostrarArboles(arboles) {
    const container = $('#arboles-container');
    container.empty();

    arboles.forEach(arbol => {
      container.append(`
          <div class="arbol-card">
            <p>Especie: ${arbol.especie}</p>
            <p>Altura: ${arbol.altura} cm</p>
          </div>
        `);
    });
  }*/
  mostrarError(message) {
    this.container.html(`
        <div class="alert alert-danger">
          ${message}
        </div>
      `);
  }
}

window.PlantacionesView = PlantacionesView;