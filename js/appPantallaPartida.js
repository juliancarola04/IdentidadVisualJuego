import { Jugador, Tablero } from "./clases/clases.js";

const JSONdeTablero = JSON.parse(localStorage.getItem("tableroJSON"));
const JSONdeJugadores = JSON.parse(localStorage.getItem("nombreJugadoresJSON"));

let jugador1;
let jugador2;
let tablero;

// Si no existe ningún tablero almacenado
if (JSONdeTablero === null)
{
    // Y no hay ningún jugador almacenado
    if (JSONdeJugadores === null){
        // Se va
        console.log("No hay nada de nada almacenado")
        window.location.href = "../html/index.html";
    }

    // Y hay jugadores almacenados, crea el tablero con los jugadores
    console.log("No hay una partida almacenada")

    jugador1 = new Jugador(JSONdeJugadores[0]);
    jugador2 = new Jugador(JSONdeJugadores[1]);
    tablero = new Tablero(jugador1, jugador2);

    localStorage.removeItem("nombreJugadoresJSON"); // Acá elimino el localStorage de los jugadores ya que no va a ser necesario
    localStorage.setItem("tableroJSON", JSON.stringify(tablero)); // Acá guardo en el localStorage el estado inicial del tablero (se va a ir actualizando después).

} else {

    // Si hay un tablero almacenado, parte desde ahí.
    console.log("Hay una partida almacenada")

    const datosPartida = JSONdeTablero;

    jugador1 = new Jugador(datosPartida.jugadorUno.nombre, datosPartida.jugadorUno.puntajeActual, datosPartida.jugadorUno.puntajeTotal, datosPartida.jugadorUno.rondasGanadas);
    jugador2 = new Jugador(datosPartida.jugadorDos.nombre, datosPartida.jugadorDos.puntajeActual, datosPartida.jugadorDos.puntajeTotal, datosPartida.jugadorDos.rondasGanadas);
    tablero = new Tablero(jugador1, jugador2, datosPartida.rondaActual, datosPartida.resultadoDado);
}

document.getElementById('nombreJugador1').textContent = "Nombre: " + jugador1.getNombre;
document.getElementById('puntajeActualJugador1').textContent = "Puntaje actual: " + jugador1.getpuntajeActual;
document.getElementById('puntajeTotalJugador1').textContent = "Puntaje total: " + jugador1.getpuntajeTotal;
document.getElementById('rondasGanadasJugador1').textContent = "Rondas ganadas: " + jugador1.getrondasGanadas;

document.getElementById('nombreJugador2').textContent = "Nombre: " + jugador2.getNombre;
document.getElementById('puntajeActualJugador2').textContent = "Puntaje actual: " + jugador2.getpuntajeActual;
document.getElementById('puntajeTotalJugador2').textContent = "Puntaje total: " + jugador2.getpuntajeTotal;
document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getrondasGanadas;

const botonJugador1 = document.getElementById('tirarDadoJugador1');
const botonJugador2 = document.getElementById('tirarDadoJugador2');

botonJugador1.addEventListener('click', () => jugador1.tirarDado(botonJugador1, tablero));
botonJugador2.addEventListener('click', () => jugador2.tirarDado(botonJugador2, tablero));
