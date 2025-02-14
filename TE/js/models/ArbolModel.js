class ArbolModel {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    getArbolesPorPlantacion(plantacionId) {
        return $.ajax({
            url: `${this.apiUrl}/arbol/get/${plantacionId}`,
            method: 'GET'
        });
    }
}

window.ArbolModel = ArbolModel;