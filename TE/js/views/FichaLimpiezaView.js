class FichaLimpiezaView {
  constructor() {
    this.elementos = {
      ubicacion: $('#ubicacion'),
      fecha: $('#fecha'),
      participantes: $('#participantes'),
      descripcion: $('#descripcion'),
      cantidad: $('#recogida'),
      imagen: $('#imagen')
    };
  }

  mostrarLimpieza(limpieza) {
    this.elementos.ubicacion.text(limpieza.ubicacion);
    this.elementos.fecha.text(limpieza.fecha_limpieza);
    this.elementos.participantes.text(limpieza.participantes);
    this.elementos.descripcion.text(limpieza.descripcion || 'No hay descripción disponible.');
    this.elementos.cantidad.text(limpieza.cantidadRecogida);
    this.elementos.imagen.attr('src', './img/limpieza_rio_1.jpg');
  }


  mostrarError(mensaje) {
    $('#ficha-container').html(`
          <div class="alert alert-danger mt-4">
            ${mensaje}
          </div>
        `);
  }
}

window.FichaLimpiezaView = FichaLimpiezaView;   