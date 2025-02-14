class ResumenController {
    constructor(apiUrl) {
        this.model = new ResumenModel(apiUrl);
        this.view = new ResumenView();
        this.obtenerResumen();
    }

    obtenerResumen() {
        this.model.obtenerDatosResumen()
            .done(response => this._procesarDatos(response))
            .fail(() => this.view.mostrarError());
    }

    _procesarDatos(response) {
        try {
            const datos = typeof response === 'string' ? JSON.parse(response) : response;
            let totalArboles = 0;
            let totalPlantaciones = 0;

            if (datos.plantaciones?.length > 0) {
                totalPlantaciones = datos.plantaciones.length;
                totalArboles = datos.plantaciones.reduce((total, plantacion) => {
                    return total + (plantacion.arboles?.reduce((sum, arbol) => sum + arbol.cantidad, 0) || 0);
                }, 0);
            }

            this.view.actualizarContadores(totalPlantaciones, totalArboles);
        } catch (error) {
            this.view.mostrarError();
        }
    }
}

window.ResumenController = ResumenController;