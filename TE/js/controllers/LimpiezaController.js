class LimpiezaController {
    constructor(apiUrl) {
        this.model = new LimpiezaModel(apiUrl);
        this.view = new LimpiezasView();
        this.inicializar();
    }

    inicializar() {
        this.cargarLimpiezas();
        this.configurarEventos();
    }

    cargarLimpiezas() {
        this.model.getLimpiezas()
            .done(response => {
                const datos = typeof response === 'string' ? JSON.parse(response) : response;

                console.log(datos)
                if (datos.limpiezas?.length > 0) {
                    //const totalArboles = this._calcularTotalArboles(datos.limpiezas);
                    this.view.mostrarLimpiezas(datos.limpiezas);
                } else {
                    this.view.mostrarError('No se encontraron limpiezas');
                }
            })
            .fail((xhr, status, error) => {
                this.view.renderError(`Error al cargar: ${error}`);
            });
    }

    configurarEventos() {
        $(document).on('click', '.ver-ficha', (e) => {
            const id = $(e.currentTarget).data('id');
            window.location.href = `fichaLimpieza.html?id=${id}`;
        });
    }
}

window.LimpiezaController = LimpiezaController;