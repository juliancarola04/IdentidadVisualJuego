import { Jugador, Tablero } from "./clases/clases.js";

const JSONdeJugadores = JSON.parse(localStorage.getItem("nombreJugadoresJSON"));

if (JSONdeJugadores === null)
{
    window.location.href = "../html/index.html";
}


