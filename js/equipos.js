'use strict'

var divEquipos = document.querySelector('#equipos');



todosPartidos()
    .then(data => data.json())
    .then(teams => {
        console.log(teams.data);
        pintarEquipos(teams.data);

        loader.style.display = "none";// Borramos el loader

    })

function todosPartidos() {
    return fetch('https://www.balldontlie.io/api/v1/teams');
}

function pintarEquipos(equipos) {

    equipos.map(function (equipo, i) {

        //let nombre = document.createElement('h3');
        let fila = document.createElement("tr");

        let array = [
            equipos[i].id,
            equipos[i].city,
            equipos[i].name,
            equipos[i].conference,
            equipos[i].division,
            equipos[i].abbreviation,

        ];
        for (let j = 0; j < array.length; j++) {
            let celda = document.createElement("td");

            celda.append(array[j]);
            fila.append(celda);
        }

        let plantilla = document.createElement("button");
        plantilla.className = "btnPlantilla";
        plantilla.textContent = "Plantilla"
        let equipoID = equipos[i].id;

        plantilla.addEventListener("click", function () {

            // Guardar el equipoId en localStorage
            localStorage.setItem("equipoId", equipoID);

            // Redirige a la página "jugadores.html"
            window.location.href = "jugadores.html";
        });


        fila.appendChild(plantilla);
        tbody.append(fila);

        //quitar el cargando
        //document.querySelector('.cargando').computedStyleMap.dysplay = 'none';
    })
}

function buscarPlantilla(id) {


}