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

document.getElementById('rondaActual').textContent = "Ronda actual: " + tablero.getRondaActual;

const botonJugador1 = document.getElementById('tirarDadoJugador1');
const botonJugador2 = document.getElementById('tirarDadoJugador2');

if (jugador1.getTiradoDado === true){
    quitarBoton(botonJugador1);
}

if (jugador2.getTiradoDado === true){
    quitarBoton(botonJugador2);
}

botonJugador1.addEventListener('click', () => {
    // Hacer cositas acá. A eso me refiero con lo que escribí en la clase. Probablemente tampoco
    // debería de importarle el botonJugador ni el tablero.
    if (tablero.getDadoSiendoTirado === false && jugador1.getTiradoDado === false){
        const resultado = jugador1.tirarDado();
        const cantidadTiempoEsperar = 500;    
    
        const imagenDado = document.getElementById('imagen-dado');
        const textoDado = document.getElementById('resultado-dado-texto');
        quitarBoton(botonJugador1);
     
        imagenDado.classList.add("rodando");
        tablero.setDadoSiendoTirado = true;
    
        setTimeout(() => {
            imagenDado.src = `../imagenes/carasDado/cara${resultado}.png`;
            imagenDado.classList.remove("rodando");    
            textoDado.textContent = `${jugador1.getNombre} sacó un ${resultado}`;
            tablero.setDadoSiendoTirado = false;
    
            if (resultado !== false)
            {
                console.log(resultado);
                tablero.setResultadoDado = resultado;
                document.getElementById('puntajeActualJugador1').textContent = "Puntaje actual: " + resultado;
                document.getElementById('puntajeTotalJugador1').textContent = "Puntaje total: " + jugador1.getPuntajeTotal;
                tablero.guardarEstado();
            }
            comportamientoComprobacion("rondaActual");
        }, cantidadTiempoEsperar);
    }
});


botonJugador2.addEventListener('click', () => {
    if(tablero.getDadoSiendoTirado === false && jugador2.getTiradoDado === false){
        const resultado = jugador2.tirarDado();
        const cantidadTiempoEsperar = 500;
        
        const imagenDado = document.getElementById('imagen-dado');
        const textoDado = document.getElementById('resultado-dado-texto');    
        quitarBoton(botonJugador2);  
    
        imagenDado.classList.add("rodando");
        tablero.setDadoSiendoTirado = true;
    
        setTimeout(() => {
            imagenDado.src = `../imagenes/carasDado/cara${resultado}.png`;
            imagenDado.classList.remove("rodando");    
            textoDado.textContent = `${jugador2.getNombre} sacó un ${resultado}`;
            tablero.setDadoSiendoTirado = false;
    
            if (resultado !== false)
            {
                tablero.setResultadoDado = resultado;
                document.getElementById('puntajeActualJugador2').textContent = "Puntaje actual: " + resultado;
                document.getElementById('puntajeTotalJugador2').textContent = "Puntaje total: " + jugador2.getPuntajeTotal;
                document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getRondasGanadas;
                tablero.guardarEstado();
            }
        
            comportamientoComprobacion("rondaActual");
        }, cantidadTiempoEsperar); 
    }
});

function comportamientoComprobacion(id){
    if(tablero.jugadorUno.tiroDado === true && tablero.jugadorDos.tiroDado === true && tablero.getDadoSiendoTirado === false){
        if (tablero.jugadorUno.puntajeActual > tablero.jugadorDos.puntajeActual){
            jugador1.setRondasGanadas = jugador1.getRondasGanadas + 1;
            document.getElementById('rondasGanadasJugador1').textContent = "Rondas ganadas: " + jugador1.getRondasGanadas;
        } else if(tablero.jugadorUno.puntajeActual < tablero.jugadorDos.puntajeActual){
            jugador2.setRondasGanadas = jugador2.getRondasGanadas + 1;
            document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getRondasGanadas;
        } else {
            tablero.setRondasEmpatadas = tablero.getRondasEmpatadas + 1;
        }

        if (jugador1.getRondasGanadas === 5 || jugador2.getRondasGanadas === 5) {
            // Pass in the id of an element
            let confetti = new Confetti('containerConfite');

            // Edit given parameters
            confetti.setCount(75);
            confetti.setSize(1);
            confetti.setPower(25);
            confetti.setFade(false);
            confetti.destroyTarget(false);             
        }

        agregarBoton(botonJugador1);
        agregarBoton(botonJugador2);
        tablero.setRondaActual = tablero.getRondaActual + 1;
        jugador1.setTiroDado = false;
        jugador2.setTiroDado = false;

        tablero.guardarEstado();       
    }

    const rondaActual = document.getElementById(id);
    rondaActual.textContent = "Ronda actual: " + tablero.getRondaActual;
}

function quitarBoton(boton){
    boton.classList.remove("habilitado", "btn-primary");
    boton.classList.add("btn-secondary")
    boton.textContent = "Tiro realizado";    
}

function agregarBoton (boton){
    boton.classList.remove("btn-secondary");
    boton.classList.add("habilitado", "btn-primary")
    boton.textContent = "Tirar dado";    
}