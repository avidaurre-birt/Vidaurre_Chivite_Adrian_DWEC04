class PlantacionController {
    constructor(apiUrl) {
        this.model = new PlantacionModel(apiUrl);
        this.view = new PlantacionesView();
        this.inicializar();
    }

    inicializar() {
        this.cargarPlantaciones();
        this.configurarEventos();
    }

    cargarPlantaciones() {
        this.model.getPlantaciones()
            .done(response => {
                const datos = typeof response === 'string' ? JSON.parse(response) : response;

                console.log(datos)
                if (datos.plantaciones?.length > 0) {
                    //const totalArboles = this._calcularTotalArboles(datos.plantaciones);
                    this.view.mostrarPlantaciones(datos.plantaciones);
                } else {
                    this.view.mostrarError('No se encontraron plantaciones');
                }
            })
            .fail((xhr, status, error) => {
                this.view.renderError(`Error al cargar: ${error}`);
            });
    }

    cargarArboles(plantacionId) {
        this.arbolModel.getArbolesPorPlantacion(plantacionId)
            .done(response => {
                const arboles = typeof response === 'string' ? JSON.parse(response) : response;
                this.view.renderArboles(arboles);
            })
            .fail(error => {
                this.view.renderError('Error al cargar árboles');
            });
    }

    configurarEventos() {
        $(document).on('click', '.ver-ficha', (e) => {
            const id = $(e.currentTarget).data('id');
            window.location.href = `ficha.html?id=${id}`;
        });
    }
}

window.PlantacionController = PlantacionController;