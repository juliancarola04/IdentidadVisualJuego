import { Jugador, Tablero } from "./clases/clases.js";

// Recupero los datos almacenados del localStorage
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
        
    jugador1 = new Jugador(JSONdeTablero.jugadorUno.nombre, JSONdeTablero.jugadorUno.puntajeActual, JSONdeTablero.jugadorUno.puntajeTotal, JSONdeTablero.jugadorUno.rondasGanadas, JSONdeTablero.jugadorUno.tiroDado);
    jugador2 = new Jugador(JSONdeTablero.jugadorDos.nombre, JSONdeTablero.jugadorDos.puntajeActual, JSONdeTablero.jugadorDos.puntajeTotal, JSONdeTablero.jugadorDos.rondasGanadas, JSONdeTablero.jugadorDos.tiroDado);
    tablero = new Tablero(jugador1, jugador2, JSONdeTablero.rondaActual, JSONdeTablero.resultadoDado);
}

// Dibujo el estado del tablero
dibujarTablero();

const botonJugador1 = document.getElementById('tirarDadoJugador1');
const botonJugador2 = document.getElementById('tirarDadoJugador2');

const botonReiniciar = document.getElementById('botonReiniciar');

const headerGanador = document.getElementById("ganador");

// Si el jugador tiró el dado, pierde la posibilidad de volverlo a tirar hasta la próxima ronda
if (jugador1.getTiroDado === true){
    quitarBoton(botonJugador1);
}

if (jugador2.getTiroDado === true){
    quitarBoton(botonJugador2);
}


botonJugador1.addEventListener('click', () => {
    funcionalidadBotonesJugadores(jugador1, '1', botonJugador1, tablero); // Funcionamiento en su respectivo método
});


botonJugador2.addEventListener('click', () => {
    funcionalidadBotonesJugadores(jugador2, '2', botonJugador2, tablero);
});

// Cuando le den al botón de reiniciar
botonReiniciar.addEventListener('click', () => {

    // Establezco todo al estado inicial.
    tablero.setRondaActual = 1; // Menos este que va a partir de 1 (la ronda avanza cuando ambos tiran, asi que tiene que ser 1)
    
    const jugadores = [jugador1, jugador2];

    // por cada jugador
    jugadores.forEach(jugador => {
        jugador.setRondaActual = 0;
        jugador.setRondasGanadas = 0;
        jugador.setPuntajeActual = 0;
        jugador.setPuntajeTotal = 0;
        jugador.setNumeroTiradas = 0;

        // Permito a los jugadores volver a tirar (flags)        
        jugador.setTiroDado = false;
    });

    // Agrego en sí la posibilidad de que puedan tirar (lo estético)
    agregarBoton(botonJugador1);
    agregarBoton(botonJugador2);

    // Cambio los textos ya que si no van a quedar guardados los que habían en la anterior partida
    const textoDado = document.getElementById('resultado-dado-texto');    
    textoDado.textContent = "Tirá el dado para empezar";
    tablero.setHayGanador = false;
    headerGanador.textContent = "";

    // Procedimiento por defecto para guardar en el localStorage y redibujar el tablero
    tablero.guardarEstado();
    dibujarTablero();    
})

// Función que va a ser llamada para ir viendo quién ganó la ronda y/o la partida
function comportamientoComprobacion(id){

    // if principal. Solo va a andar esto cuando ambos jugadores hayan tirado sus respectivos dados y no haya ningún dado siendo tirado (esto último
    // se tuvo que agregar porque si no se hacía no se esperaba al setTimeout)
    if(tablero.jugadorUno.tiroDado === true && tablero.jugadorDos.tiroDado === true && tablero.getDadoSiendoTirado === false){
        if (tablero.jugadorUno.puntajeActual > tablero.jugadorDos.puntajeActual){ // La ronda la gana el jugador 1
            jugador1.setRondasGanadas = jugador1.getRondasGanadas + 1;
            document.getElementById('rondasGanadasJugador1').textContent = "Rondas ganadas: " + jugador1.getRondasGanadas;
            document.getElementById('ganador').textContent = `${jugador1.nombre} ganó la ronda!`            
            postTirarDadoSinGanar(botonJugador1, botonJugador2); // Función comentada más adelante
            tablero.setRondaActual = tablero.getRondaActual + 1;
        } else if(tablero.jugadorUno.puntajeActual < tablero.jugadorDos.puntajeActual){ // La ronda la gana el jugador 2
            jugador2.setRondasGanadas = jugador2.getRondasGanadas + 1;
            document.getElementById('rondasGanadasJugador2').textContent = "Rondas ganadas: " + jugador2.getRondasGanadas;
            document.getElementById('ganador').textContent = `${jugador2.nombre} ganó la ronda!`                        
            postTirarDadoSinGanar(botonJugador1, botonJugador2);
            tablero.setRondaActual = tablero.getRondaActual + 1;
        } else { // La ronda es empatada.
            postTirarDadoSinGanar(botonJugador1, botonJugador2);
            tablero.setRondaActual = tablero.getRondaActual + 1;
        }

        // Comprobación de ver si alguno de los dos ganó
        if (jugador1.getRondasGanadas === 5 || jugador2.getRondasGanadas === 5) {
            confetti(); // Tiro el confeti si alguno lo hizo
            if (jugador1.getRondasGanadas === 5){
                ganador(jugador1); // Funciones comentadas más adelantes 
                postTirarDadoGanando(botonJugador1, botonJugador2); // Funciones comentadas más adelantes
            } else {
                ganador(jugador2);
                postTirarDadoGanando(botonJugador1, botonJugador2);
            }
        }
        
        // Luego de hacer todos los cálculos correspondientes guardo el estado del tablero
        tablero.guardarEstado();       
    }

    // Actualizo la ronda actual
    const rondaActual = document.getElementById(id);
    rondaActual.textContent = "Ronda actual: " + tablero.getRondaActual;
}

// Comentado más arriba
function quitarBoton(boton){
    boton.classList.remove("habilitado", "btn-primary");
    boton.classList.add("btn-secondary")
    boton.textContent = "Tiro realizado";    
}

// Comentado más arriba
function agregarBoton (boton){
    boton.classList.remove("btn-secondary");
    boton.classList.add("habilitado", "btn-primary")
    boton.textContent = "Tirar dado";    
}

// Cambio el header para que diga quién ganó
function ganador(jugador){
    headerGanador.textContent = `${jugador.getNombre} gano!`;
}

// Dibujo el tablero con los datos de los objetos.
function dibujarTablero(){
    
    // por cada jugador (algo hardcodeado esto)
    for(let i = 1; i <= 2; i++){
        let jugador;        
        if (i === 1) {
            jugador = jugador1;
        } else {
            jugador = jugador2;
        }
        
        document.getElementById(`nombreJugador${i}`).textContent = "Nombre: " + jugador.getNombre;
        document.getElementById(`numeroTiradasJugador${i}`).textContent = "Número de tiradas: " + jugador.getNumeroTiradas;
        document.getElementById(`puntajeActualJugador${i}`).textContent = "Puntaje actual: " + jugador.getPuntajeActual;
        document.getElementById(`puntajeTotalJugador${i}`).textContent = "Puntaje total: " + jugador.getPuntajeTotal;
        document.getElementById(`rondasGanadasJugador${i}`).textContent = "Rondas ganadas: " + jugador.getRondasGanadas;
    }
    document.getElementById('rondaActual').textContent = "Ronda actual: " + tablero.getRondaActual;    
}

// Función que se va a ejecutar cuando el jugador le de al botón.
function funcionalidadBotonesJugadores(jugador, numJugador, boton, tablero){
    
    // If principal. Lo que hará será ver si se está tirando un dado en ese momento, si el jugador tiró o no un dado y
    // si hay un ganador. Si alguna de estas es true, no anda este if.
    if(tablero.getDadoSiendoTirado === false && jugador.getTiroDado === false && tablero.getHayGanador === false){
        const resultado = jugador.tirarDado(); // Obtengo el valor que tiró el jugador
        const cantidadTiempoEsperar = 500;

        // Establezco que el jugador tiró 1 vez más
        jugador.setNumeroTiradas = jugador.getNumeroTiradas + 1;

        const imagenDado = document.getElementById('imagen-dado');
        const textoDado = document.getElementById('resultado-dado-texto');    
        quitarBoton(boton);  // Le quito lo visual de volver a tirar ANTES de que se muestre el resultado del dado.
    
        imagenDado.classList.add("rodando"); // Le doy la clase de rodando así se puede aplicar el CSS propio de rodando.
        tablero.setDadoSiendoTirado = true; // Establezco que se está tirando un dado así el mismo jugador o el otro no pueden hasta que finalice la animación
    
        // "Espera" (la aplicación sigue andando) una X cantidad de tiempo (500ms en este caso) y ejecuta la función que hay adentro
        setTimeout(() => {
            imagenDado.src = `../imagenes/carasDado/cara${resultado}.png`; // Establezco la imágen del dado sea correspondiente al resultado que salió 
            imagenDado.classList.remove("rodando");
            textoDado.textContent = `${jugador.getNombre} sacó un ${resultado}`;
            tablero.setDadoSiendoTirado = false; // Establezco que ahora el otro jugador pueda tirar si es que quiere
    
            // Muestro los resultados
            tablero.setResultadoDado = resultado;
            document.getElementById(`numeroTiradasJugador${numJugador}`).textContent = "Número de tiradas: " + jugador.getNumeroTiradas;
            document.getElementById(`puntajeActualJugador${numJugador}`).textContent = "Puntaje actual: " + resultado;
            document.getElementById(`puntajeTotalJugador${numJugador}`).textContent = "Puntaje total: " + jugador.getPuntajeTotal;
            document.getElementById(`rondasGanadasJugador${numJugador}`).textContent = "Rondas ganadas: " + jugador.getRondasGanadas;
            tablero.guardarEstado();
        
            comportamientoComprobacion("rondaActual"); // Compruebo a ver como va evolucionando todo
        }, cantidadTiempoEsperar); 
    }
}

// Función que uso cuando tiran dados pero aún nadie ganó la partida
function postTirarDadoSinGanar(botonJugador1, botonJugador2){
    
    // Les permito tirar de nuevo
    agregarBoton(botonJugador1);
    agregarBoton(botonJugador2);
    jugador1.setTiroDado = false;
    jugador2.setTiroDado = false;

    // Cambio el puntaje actual de los jugadores
    jugador1.setPuntajeActual = 0;
    jugador2.setPuntajeActual = 0;
}

function postTirarDadoGanando(botonJugador1, botonJugador2){
    
    // Les quito la posibilidad de tirar de nuevo hasta que le den a reinciar
    quitarBoton(botonJugador1);
    quitarBoton(botonJugador2);
    jugador1.setTiroDado = true;
    jugador2.setTiroDado = true;
    tablero.setHayGanador = true;    
}