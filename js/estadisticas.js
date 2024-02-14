'use strict'

var divEquipos = document.querySelector('#equipos');

todasLasEstadisticas()
    //.then(data => data.json())
    .then(stats => {

        let top = ordenarEstadisticas(stats);
        console.log(typeof top); // Es un objeto
        pintarEstadisticas(top);
        loader.style.display = "none";

    })

function todasLasEstadisticas() {
    //Necesito hacer varias peticiones porque tengo una limitacion de 100 resultados por cada vez.
    let jugadores = [];
    let numeroPaginas = 30; // Me interesa recojer la mayor info posible


    // Función auxiliar para realizar una solicitud para una página específica
    function obtenerJugadoresPorPagina(pagina) {
        return fetch('https://www.balldontlie.io/api/v1/stats?seasons[]=2023&per_page=100&page=' + pagina)
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

//Creamo una array vacia. La rellenamos con los 10 primeros registros y los ordenamos de mayor a menor.
function ordenarEstadisticas(datos) {
    let arrAnotadores = [];

    for (let i = 0; i < datos.length; i++) {

        if (arrAnotadores.length < 10) {
            arrAnotadores.push(datos[i]);
            arrAnotadores.sort((a, b) => b.pts - a.pts);
        } else //Una vez completada iremos comparando cada registro con los 10 que tenemos para quedarnos con los mayores
            for (let j = 0; j < arrAnotadores.length; j++) {
                //Si encontramos un registro mayor lo sustituiremos en el array de maximos anotadores y ordenaremos. Se acabara ese ciclo.
                if (datos[i].pts > arrAnotadores[j].pts) {
                    arrAnotadores[j] = datos[i];
                    arrAnotadores.sort((a, b) => b.pts - a.pts);
                    break;
                }
            }
    }
    return {
        arrAnotadores
    };
}


function pintarEstadisticas(jugadoresObjeto) {
    let jugadores = Object.values(jugadoresObjeto);//Al ser un objeto de objetos lo convierto en Array
    console.log(jugadores);
    jugadores.map(function (arrayAnotadores, i) {//Extraigo el array dentro del array
        console.log(arrayAnotadores);
        arrayAnotadores.map(function (jugador) {//Lo recorro
            console.log(jugador);

            let fila = document.createElement("tr");

            let array = [
                (`${jugador.player.first_name} ${jugador.player.last_name}`),
                jugador.team.full_name,
                jugador.pts,
                jugador.reb,
                jugador.ast,
                jugador.min


            ];
            for (let j = 0; j < array.length; j++) {
                let celda = document.createElement("td");

                celda.append(array[j]);

                fila.append(celda);
            }
            tbody.append(fila);
        })
        //quitar el cargando
        //document.querySelector('.cargando').computedStyleMap.dysplay = 'none';
    })
}