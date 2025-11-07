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

dibujarTablero();

const botonJugador1 = document.getElementById('tirarDadoJugador1');
const botonJugador2 = document.getElementById('tirarDadoJugador2');

const botonReiniciar = document.getElementById('botonReiniciar');

const headerGanador = document.getElementById("ganador");


if (jugador1.getTiradoDado === true){
    quitarBoton(botonJugador1);
}

if (jugador2.getTiradoDado === true){
    quitarBoton(botonJugador2);
}

botonJugador1.addEventListener('click', () => {
    funcionalidadBotonesJugadores(jugador1, '1', botonJugador1, tablero);
});


botonJugador2.addEventListener('click', () => {
    funcionalidadBotonesJugadores(jugador2, '2', botonJugador2, tablero);
});

botonReiniciar.addEventListener('click', () => {

    tablero.setRondaActual = 1;
    jugador1.setRondaActual = 0;
    jugador1.setRondasGanadas = 0;
    jugador2.setRondasGanadas = 0;
    jugador2.setRondaActual = 0;
    jugador1.setPuntajeActual = 0;
    jugador2.setPuntajeActual = 0;
    jugador1.setPuntajeTotal = 0;
    jugador2.setPuntajeTotal = 0;
    jugador1.setTiroDado = false;
    jugador2.setTiroDado = false;

    agregarBoton(botonJugador1);
    agregarBoton(botonJugador2);
    const textoDado = document.getElementById('resultado-dado-texto');    
    textoDado.textContent = "Tirá el dado para empezar";
    tablero.setHayGanador = false;

    tablero.guardarEstado();
    dibujarTablero();    
})

function comportamientoComprobacion(id){
    if(tablero.jugadorUno.tiroDado === true && tablero.jugadorDos.tiroDado === true && tablero.getDadoSiendoTirado === false){
        if (tablero.jugadorUno.puntajeActual > tablero.jugadorDos.puntajeActual){
            jugador1.setRondasGanadas = jugador1.getRondasGanadas + 1;
            document.getElementById('rondasGanadasJugador1').textContent = "Rondas ganadas: " + jugador1.getRondasGanadas;
            postTirarDadoSinGanar(botonJugador1, botonJugador2);
            tablero.setRondaActual = tablero.getRondaActual + 1;
        } else if(tablero.jugadorUno.puntajeActual < tablero.jugadorDos.puntajeActual){
            jugador2.setRondasGanadas = jugador2.getRondasGanadas + 1;
            document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getRondasGanadas;
            postTirarDadoSinGanar(botonJugador1, botonJugador2);
            tablero.setRondaActual = tablero.getRondaActual + 1;
        } else {
            tablero.setRondasEmpatadas = tablero.getRondasEmpatadas + 1;
            postTirarDadoSinGanar(botonJugador1, botonJugador2);
            tablero.setRondaActual = tablero.getRondaActual + 1;
        }

        if (jugador1.getRondasGanadas === 5 || jugador2.getRondasGanadas === 5) {
            confetti();
            if (jugador1.getRondasGanadas === 5){
                ganador(jugador1);
                postTirarDadoGanando(botonJugador1, botonJugador2);
            } else {
                ganador(jugador2);
                postTirarDadoGanando(botonJugador1, botonJugador2);
            }
        }
        
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

function ganador(jugador){
    headerGanador.textContent = `${jugador.getNombre} gano!`;
    // tablero.setRondaActual = 0;
    // jugador1.setRondaActual = 0;
    // jugador1.setRondasGanadas = 0;
    // jugador2.setRondasGanadas = 0;
    // jugador2.setRondaActual = 0;
    // jugador1.puntajeActual = 0;
    // jugador2.puntajeActual = 0;
    // jugador1.puntajeTotal = 0;
    // jugador2.puntajeTotal = 0;
    // dibujarTablero();
}

function dibujarTablero(){
    
    document.getElementById('nombreJugador1').textContent = "Nombre: " + jugador1.getNombre;
    document.getElementById('puntajeActualJugador1').textContent = "Puntaje actual: " + jugador1.getPuntajeActual;
    document.getElementById('puntajeTotalJugador1').textContent = "Puntaje total: " + jugador1.getPuntajeTotal;
    document.getElementById('rondasGanadasJugador1').textContent = "Rondas ganadas: " + jugador1.getRondasGanadas;

    document.getElementById('nombreJugador2').textContent = "Nombre: " + jugador2.getNombre;
    document.getElementById('puntajeActualJugador2').textContent = "Puntaje actual: " + jugador2.getPuntajeActual;
    document.getElementById('puntajeTotalJugador2').textContent = "Puntaje total: " + jugador2.getPuntajeTotal;
    document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getRondasGanadas;

    document.getElementById('rondaActual').textContent = "Ronda actual: " + tablero.getRondaActual;    
}

function funcionalidadBotonesJugadores(jugador, numJugador, boton, tablero){
    headerGanador.textContent = "";
    if(tablero.getDadoSiendoTirado === false && jugador.getTiradoDado === false && tablero.getHayGanador === false){
        const resultado = jugador.tirarDado();
        const cantidadTiempoEsperar = 500;
        
        const imagenDado = document.getElementById('imagen-dado');
        const textoDado = document.getElementById('resultado-dado-texto');    
        quitarBoton(boton);  
    
        imagenDado.classList.add("rodando");
        tablero.setDadoSiendoTirado = true;
    
        setTimeout(() => {
            imagenDado.src = `../imagenes/carasDado/cara${resultado}.png`;
            imagenDado.classList.remove("rodando");    
            textoDado.textContent = `${jugador.getNombre} sacó un ${resultado}`;
            tablero.setDadoSiendoTirado = false;
    
            if (resultado !== false)
            {
                tablero.setResultadoDado = resultado;
                document.getElementById(`puntajeActualJugador${numJugador}`).textContent = "Puntaje actual: " + resultado;
                document.getElementById(`puntajeTotalJugador${numJugador}`).textContent = "Puntaje total: " + jugador.getPuntajeTotal;
                document.getElementById(`rondasGanadasJugador${numJugador}`).textContent = "Rondas ganadas: " + jugador.getRondasGanadas;
                tablero.guardarEstado();
            }
        
            comportamientoComprobacion("rondaActual");
        }, cantidadTiempoEsperar); 
    }
}

function postTirarDadoSinGanar(botonJugador1, botonJugador2){
    agregarBoton(botonJugador1);
    agregarBoton(botonJugador2);
    jugador1.setTiroDado = false;
    jugador2.setTiroDado = false;    
}

function postTirarDadoGanando(botonJugador1, botonJugador2){
    quitarBoton(botonJugador1);
    quitarBoton(botonJugador2);
    jugador1.setTiroDado = true;
    jugador2.setTiroDado = true;
    tablero.setHayGanador = true;    
}