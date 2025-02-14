class LimpiezaModel {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    // Obtener todas las Limpiezas
    getLimpiezas() {
        return $.ajax({
            url: `${this.apiUrl}/limpieza/get`,
            method: 'GET'
        });
    }

    // Obtener detalles específicos de una limpieza
    getLimpiezaById(id) {
        return $.ajax({
            url: `${this.apiUrl}/limpieza/get/${id}`,
            method: 'GET'
        });
    }
}

window.LimpiezaModel = LimpiezaModel;