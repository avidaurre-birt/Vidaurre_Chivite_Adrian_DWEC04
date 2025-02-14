class ResumenView {
    constructor() {
        this.elementos = {
            totalPlantaciones: $('#total-plantaciones'),
            totalArboles: $('#total-arboles')
        };
    }

    actualizarContadores(plantaciones, arboles) {
        this._animarContador(this.elementos.totalPlantaciones, plantaciones);
        this._animarContador(this.elementos.totalArboles, arboles);
    }

    _animarContador(elemento, valorFinal) {
        let valorInicial = 0;
        const duracion = 2000;
        const incremento = Math.ceil(valorFinal / (duracion / 30));

        const intervalo = setInterval(() => {
            valorInicial += incremento;
            if (valorInicial >= valorFinal) {
                valorInicial = valorFinal;
                clearInterval(intervalo);
            }
            elemento.text(valorInicial);
        }, 30);
    }

    mostrarError() {
        this.elementos.totalPlantaciones.text("Error");
        this.elementos.totalArboles.text("Error");
    }
}

window.ResumenView = ResumenView;