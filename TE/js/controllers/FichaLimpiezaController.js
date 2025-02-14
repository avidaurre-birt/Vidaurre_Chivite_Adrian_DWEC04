class FichaLimpiezaController {
    constructor(apiUrl) {
        this.model = new LimpiezaModel(apiUrl);
        this.view = new FichaLimpiezaView();
        this.LimpiezaId = new URLSearchParams(window.location.search).get('id');
        this.inicializar();
    }

    inicializar() {
        if (!this.LimpiezaId) {
            this.view.mostrarError('ID de limpieza no válido');
            return;
        }

        this.cargarLimpieza();
        this.configurarEventos();
    }

    cargarLimpieza() {
        this.model.getLimpiezaById(this.LimpiezaId)
            .done(response => {
                try {
                    const datos = typeof response === 'string' ? JSON.parse(response) : response;
                    if (datos.limpieza) {
                        this.view.mostrarLimpieza(datos.limpieza);
                    } else {
                        this.view.mostrarError('Limpieza no encontrada');
                    }
                } catch (error) {
                    this.view.mostrarError('Error en formato de datos');
                }
            })
            .fail(() => {
                this.view.mostrarError('Error al cargar los datos');
            });
    }

    configurarEventos() {
        $('.btn-volver').click(() => {
            window.location.href = 'limpiezas.html';
        });
    }
}

window.FichaLimpiezaController = FichaLimpiezaController;