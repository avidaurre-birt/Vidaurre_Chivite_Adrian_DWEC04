class PlantacionModel {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    // Obtener todas las plantaciones
    getPlantaciones() {
        return $.ajax({
            url: `${this.apiUrl}/plantacion/get`,
            method: 'GET'
        });
    }

    // Obtener detalles específicos de una plantación
    getPlantacionById(id) {
        return $.ajax({
            url: `${this.apiUrl}/plantacion/get/${id}`,
            method: 'GET'
        });
    }
}

window.PlantacionModel = PlantacionModel;