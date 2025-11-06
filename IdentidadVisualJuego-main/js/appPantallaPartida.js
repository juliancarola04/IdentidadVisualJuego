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
    cambiarTurno(botonJugador1, botonJugador2, jugador1, 'puntajeActualJugador1' ,'puntajeTotalJugador1', 'rondasGanadasJugador1', 'rondasGanadasJugador2' )

);
botonJugador2.addEventListener('click', () =>
    cambiarTurno(botonJugador2, botonJugador1, jugador2, 'puntajeActualJugador2', 'puntajeTotalJugador2', 'rondasGanadasJugador2', 'rondasGanadasJugador1' )
);

function cambiarTurno(botonActual, botonSiguiente, jugadorActual, puntajeActual, puntajeTotal, rondasGanadasJugador, rondasGanadasOponente) {
    const resultado = jugadorActual.tirarDado();
    const ganador = tablero.actualizarRonda();

    if (resultado === false) return;

    // Deshabilitar el botón actual (ya tiró)
    botonActual.classList.remove("habilitado", "btn-primary");
    botonActual.classList.add("btn-secondary");
    botonActual.textContent = "Tiro realizado";    

    // Actualizar el puntaje en el DOM (puntaje actual del tiro y total acumulado)
    document.getElementById(puntajeActual).textContent = 
        "Puntaje actual: " + jugadorActual.getPuntajeActual;
    document.getElementById(puntajeTotal).textContent =
        "Puntaje total: " + jugadorActual.getPuntajeTotal;
    document.getElementById(rondasGanadasJugador).textContent =
        "Rondas ganadas: " + jugadorActual.getRondasGanadas;

    // Habilitar el botón del otro jugador
    botonSiguiente.classList.remove("btn-secondary");
    botonSiguiente.classList.add("habilitado", "btn-primary");
    botonSiguiente.textContent = "Tirar dado";

    // Guardar resultado del dado y estado del tablero
    tablero.resultadoDado = resultado;
    tablero.guardarEstado();
    

const imagenDado = document.getElementById('imagen-dado');
const textoDado = document.getElementById('resultado-dado-texto');

imagenDado.classList.add("rodando");
setTimeout(() => {
  imagenDado.src = `../imagenes/dado/cara${resultado}.png`;
  imagenDado.classList.remove("rodando");
  textoDado.textContent = `${jugadorActual.getNombre} sacó un ${resultado}`;
}, 500);

    tablero.actualizarRonda();

if (ganador) {
    // Si hay ganador, actualizo el DOM desde acá
    const mensaje = document.getElementById('mensaje-final');
    const divResultado = document.getElementById('resultado-final');

    mensaje.textContent = `🏆 ¡${ganador.getNombre} ganó la partida con ${ganador.getPuntajeTotal} puntos!`;
    divResultado.style.display = "block";

    botonJugador1.disabled = true;
    botonJugador2.disabled = true;
    // 🔹 Deshabilitar ambos botones para finalizar el juego
    botonJugador1.classList.remove("habilitado", "btn-primary");
    botonJugador1.classList.add("btn-secondary", "disabled");
    botonJugador1.textContent = "Partida finalizada";
    botonJugador2.classList.remove("habilitado", "btn-primary");
    botonJugador2.classList.add("btn-secondary", "disabled");
    botonJugador2.textContent = "Partida finalizada";
}

    // REFRESCAR UI: puede haber cambios por actualizarRonda()
    // Actualizo todos los elementos visibles para que queden consistentes
    document.getElementById('puntajeActualJugador1').textContent = "Puntaje actual: " + jugador1.getPuntajeActual;
    document.getElementById('puntajeTotalJugador1').textContent  = "Puntaje total: " + jugador1.getPuntajeTotal;
    document.getElementById('rondasGanadasJugador1').textContent = "Rondas ganadas: " + jugador1.getRondasGanadas;

    document.getElementById('puntajeActualJugador2').textContent = "Puntaje actual: " + jugador2.getPuntajeActual;
    document.getElementById('puntajeTotalJugador2').textContent  = "Puntaje total: " + jugador2.getPuntajeTotal;
    document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getRondasGanadas;

    // (Opcional) si tenés un elemento para mostrar la ronda:
    const elRonda = document.getElementById('rondaActual');
    if (elRonda) elRonda.textContent = "Ronda: " + tablero.rondaActual;
}
