'use strict'

var divEquipos = document.querySelector('#equipos');
let equipoId;

document.addEventListener("DOMContentLoaded", function () {
    // Recuperar el equipoId de localStorage
    equipoId = localStorage.getItem("equipoId");
    //console.log(equipoId);
});

// Llamar a la función para obtener todos los jugadores
obtenerTodosLosJugadores()
    .then(jugadores => {
        console.log(jugadores);
        pintarJugadores(jugadores);
        loader.style.display = "none";
    })
    .catch(error => console.error('Error al obtener los datos:', error));

// Función para obtener todos los jugadores
function obtenerTodosLosJugadores() {
    let jugadores = [];
    let numeroPaginas = 10;

    // Función auxiliar para realizar una solicitud para una página específica
    function obtenerJugadoresPorPagina(pagina) {
        return fetch('https://www.balldontlie.io/api/v1/players?per_page=100&page=' + pagina)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                jugadores = jugadores.concat(data.data);
            });
    }

    // Realizar solicitudes para cada página
    let promesas = [];
    for (let i = 1; i <= numeroPaginas; i++) {
        promesas.push(obtenerJugadoresPorPagina(i));
    }

    // Esperar a que todas las solicitudes se completen
    return Promise.all(promesas)
        .then(() => {
            return jugadores;
        });
}

function pintarJugadores(equipos) {

    equipos.map(function (equipo, i) {

        //let nombre = document.createElement('h3');

        let array = [
            equipos[i].first_name,
            equipos[i].last_name,
            equipos[i].team.full_name,
            posiciones(equipos[i].position),
            pulgadasAMetros(equipos[i].height_feet, equipos[i].height_inches),
            cambioKg(equipos[i].weight_pounds)
        ];
        if (equipos[i].team.id == equipoId) {

            let fila = document.createElement("tr");

            for (let j = 0; j < array.length; j++) {
                let celda = document.createElement("td");

                celda.append(array[j]);
                fila.append(celda);
            }
            tbody.append(fila);
        }
        //quitar el cargando
        //document.querySelector('.cargando').computedStyleMap.dysplay = 'none';
    })
}

function buscarPlantilla(id) {

}

function posiciones(pos) {
    if (pos == "F") {
        return pos = "Alero / Ala Pivot";
    } if (pos == "G") {
        return pos = "Base / Escolta";
    } if (pos == "C") {
        return pos = "Pivot";
    }
    else return pos = "-";
}

function pulgadasAMetros(pies, pulgadas) {
    if (pies == null) {
        return pies = "-"
    } else {
        let totalPulgadas = pies * 12 + pulgadas;
        let metros = Math.round((totalPulgadas * 0.0254) * 100) / 100;
        return metros;
    }
}
function cambioKg(pounds) {
    if (pounds == null) {
        return pounds = "-"
    } else {
        let metros = Math.round((pounds * 0.453592) * 100) / 100;
        return metros;
    }
}