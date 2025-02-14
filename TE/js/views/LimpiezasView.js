class LimiezasView {
  constructor() {
    this.container = $('#limpiezas-container');
  }

  mostrarLimpiezas(limpieza) {
    this.container.empty();

    if (limpieza.length === 0) {
      this.container.append('<p>No se encontraron limpiezas para mostrar.</p>');
      return;
    }

    limpieza.forEach(limpieza => {
      this.container.append(`
                            <div class="plantacion-card">
                                <h3>${limpieza.ubicacion}</h3>
                                <p><strong>Fecha:</strong> ${limpieza.fecha_limpieza}</p>
                                <button class="ver-ficha" data-id="${limpieza.id_limpieza}">Ver Ficha Completa</button>
                            </div>
        `);
    });

  }

  mostrarError(message) {
    this.container.html(`
        <div class="alert alert-danger">
          ${message}
        </div>
      `);
  }
}

window.LimpiezasView = LimiezasView;