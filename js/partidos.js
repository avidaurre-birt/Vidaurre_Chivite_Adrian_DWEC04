'use strict'

var divEquipos = document.querySelector('#equipos');
var select = document.querySelector('#select');
var botonBuscar = document.querySelector('#buscar');
var loader = document.querySelector('#loader');

todosLosPartidos()
    .then(data => data.json())
    .then(stats => {
        console.log(stats.data);
        selectEquipos(stats.data);

        pintarEquipos(ordenarPartidos(stats.data));
        botonBuscar.addEventListener("click", function () {
            tbody.innerHTML = "";
            filtros(stats.data);
        });
        loader.style.display = "none";

    })

function todosLosPartidos() {
    return fetch('https://www.balldontlie.io/api/v1/games?seasons[]=2023&per_page=100');
}

function pintarEquipos(equipos) {

    equipos.map(function (equipo, i) {

        //let nombre = document.createElement('h3');
        let fila = document.createElement("tr");

        let array = [
            equipos[i].home_team.full_name,
            equipos[i].home_team_score,
            equipos[i].visitor_team_score,
            equipos[i].visitor_team.full_name,
            equipos[i].status,
            equipos[i].date,

        ];
        if (equipos[i].time != null) {
            for (let j = 0; j < array.length; j++) {
                let celda = document.createElement("td");

                celda.append(array[j]);

                fila.append(celda);
            }
            tbody.append(fila);
        }
    })
}

//Recorremos todos los partidos para obtener los equipos
function selectEquipos(partidos) {
    let arrayEquipos = partidos.map(function (equipo) {
        return equipo.home_team.full_name;
    });
    let setEquipos = [...new Set(arrayEquipos)];

    //Una vez guardados todos los equipos, recorremos el array y creamos un opcion para seleccionar por cada equipo.
    for (let i = 0; i < setEquipos.length; i++) {
        let optionSelect = document.createElement("option");

        select.append(optionSelect);
        optionSelect.innerHTML = setEquipos[i];
    }
    console.log(setEquipos);
}

//filtra los partidos por el equipo seleccionado
function filtros(partidos) {
    let arrayFiltrada = [];

    if (select.value == "Todos los equipos") {
        pintarEquipos(partidos);
        return;
    } else {
        arrayFiltrada = partidos.filter(
            (equipo) =>
                equipo.home_team.full_name == select.value ||
                equipo.visitor_team.full_name == select.value
        );
    }

    pintarEquipos(arrayFiltrada);
}

//Ordena los partidos de mas antiguos a mas recientes
function ordenarPartidos(partidos) {
    partidos.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(partidos)
    return partidos;
}