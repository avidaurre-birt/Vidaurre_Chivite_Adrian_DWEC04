class ResumenModel {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    obtenerDatosResumen() {
        return $.ajax({
            url: `${this.apiUrl}/plantacion/get`,
            method: 'GET'
        });
    }
}

window.ResumenModel = ResumenModel;