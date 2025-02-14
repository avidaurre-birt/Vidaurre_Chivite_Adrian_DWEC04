class FichaPlantacionController {
    constructor(apiUrl) {
        this.model = new PlantacionModel(apiUrl);
        this.view = new FichaPlantacionView();
        this.plantacionId = new URLSearchParams(window.location.search).get('id');
        this.inicializar();
    }

    inicializar() {
        if (!this.plantacionId) {
            this.view.mostrarError('ID de plantación no válido');
            return;
        }

        this.cargarPlantacion();
        this.configurarEventos();
    }

    cargarPlantacion() {
        this.model.getPlantacionById(this.plantacionId)
            .done(response => {
                try {
                    const datos = typeof response === 'string' ? JSON.parse(response) : response;
                    if (datos.plantacion) {
                        this.view.mostrarPlantacion(datos.plantacion);
                    } else {
                        this.view.mostrarError('Plantación no encontrada');
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
            window.location.href = 'plantaciones.html';
        });
    }
}

window.FichaPlantacionController = FichaPlantacionController;