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
    
    jugador1 = new Jugador(datosPartida.jugadorUno.nombre, datosPartida.jugadorUno.puntajeActual, datosPartida.jugadorUno.puntajeTotal, datosPartida.jugadorUno.rondasGanadas, datosPartida.jugadorUno.tiroDado);
    jugador2 = new Jugador(datosPartida.jugadorDos.nombre, datosPartida.jugadorDos.puntajeActual, datosPartida.jugadorDos.puntajeTotal, datosPartida.jugadorDos.rondasGanadas, datosPartida.jugadorDos.tiroDado);
    tablero = new Tablero(jugador1, jugador2, datosPartida.rondaActual, datosPartida.resultadoDado);
}

document.getElementById('nombreJugador1').textContent = "Nombre: " + jugador1.getNombre;
document.getElementById('puntajeActualJugador1').textContent = "Puntaje actual: " + jugador1.getPuntajeActual;
document.getElementById('puntajeTotalJugador1').textContent = "Puntaje total: " + jugador1.getPuntajeTotal;
document.getElementById('rondasGanadasJugador1').textContent = "Rondas ganadas: " + jugador1.getRondasGanadas;

document.getElementById('nombreJugador2').textContent = "Nombre: " + jugador2.getNombre;
document.getElementById('puntajeActualJugador2').textContent = "Puntaje actual: " + jugador2.getPuntajeActual;
document.getElementById('puntajeTotalJugador2').textContent = "Puntaje total: " + jugador2.getPuntajeTotal;
document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getRondasGanadas;

const botonJugador1 = document.getElementById('tirarDadoJugador1');
const botonJugador2 = document.getElementById('tirarDadoJugador2');

if (jugador1.getTiradoDado === true){
    botonJugador1.classList.remove("habilitado", "btn-primary");
    botonJugador1.classList.add("btn-secondary");
    botonJugador1.textContent = "Tiro realizado";
}

if (jugador2.getTiradoDado === true){
    botonJugador2.classList.remove("habilitado", "btn-primary");
    botonJugador2.classList.add("btn-secondary");
    botonJugador2.textContent = "Tiro realizado";
}

botonJugador1.addEventListener('click', () =>
    cambiarTurno(botonJugador1, botonJugador2, jugador1, 'puntajeActualJugador1' ,'puntajeTotalJugador1')

);
botonJugador2.addEventListener('click', () =>
    cambiarTurno(botonJugador2, botonJugador1, jugador2, 'puntajeActualJugador2')
);

function cambiarTurno(botonActual, botonSiguiente, jugadorActual, puntajeactual, puntajetotal) {
    const resultado = jugadorActual.tirarDado();

    if (resultado === false) return;

    // Deshabilitar el botón actual (ya tiró)
    botonActual.classList.remove("habilitado", "btn-primary");
    botonActual.classList.add("btn-secondary");
    botonActual.textContent = "Tiro realizado";    

    // Actualizar el puntaje en el DOM
    document.getElementById(puntajeactual).textContent = 
        "Puntaje actual: " + jugadorActual.getPuntajeActual;
    document.getElementById(puntajetotal).textContent =
        "Puntaje total: " + jugadorActual.getPuntajeTotal;   

    // Habilitar el botón del otro jugador
    botonSiguiente.classList.remove("btn-secondary");
    botonSiguiente.classList.add("habilitado", "btn-primary");
    botonSiguiente.textContent = "Tirar dado";

    // Guardar resultado del dado y estado del tablero
    tablero.resultadoDado = resultado;
    tablero.guardarEstado();

    // 🔹 Resetear el tiro del jugador actual para la próxima ronda
    jugadorActual.tiroDado = false;
}
