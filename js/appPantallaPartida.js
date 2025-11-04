import { Jugador, Tablero } from "./clases/clases.js";

const JSONdePartida = JSON.parse(localStorage.getItem("partidaJSON"));
const JSONdeJugadores = JSON.parse(localStorage.getItem("nombreJugadoresJSON"));

// Si no existe ninguna partida guardada
if (JSONdePartida === null)
{
    // Y no hay ningún jugador almacenado
    if (JSONdeJugadores === null){
        // Se va
        window.location.href = "../html/index.html";
    }

    // Si hay jugadores almacenados crea la partida con los jugadores
} 

// Si hay una partida guardada, parte desde esa partida.


