const boton = document.getElementById("btn-empezar");
const JSONdeTablero = JSON.parse(localStorage.getItem("tableroJSON")); // Tranformo el string a un JSON

boton.addEventListener('click', () => {
    const inputTextP1 = document.getElementById('jugador1');
    const inputTextP2 = document.getElementById('jugador2');

    const valorInputP1 = inputTextP1.value.trim();
    const valorInputP2 = inputTextP2.value.trim();

    if (valorInputP1 === "" && valorInputP2 === ""){ // Si ninguno de los dos introdujo un nombre válido.
        crearMensajeError("Te olvidaste de introducir los nombres de los jugadores."); // Función comentada más adelante
        return;  
    } else if (valorInputP1 === "") { // Si solo el primero no introdujo un nombre válido
        crearMensajeError("Te olvidaste de introducir el nombre del jugador 1.");       
        return;
    } else if (valorInputP2 === "") { // Si solo el segundo no introdujo un nombre válido
        crearMensajeError("Te olvidaste de introducir el nombre del jugador 2.");
        return;
    }

    const nombreJugadores = [valorInputP1, valorInputP2]; // Creo un arreglo con los valores
    localStorage.removeItem("tableroJSON"); // Como este botón es para iniciar una nueva partida, va a borrar el talbero por si llegara a haber algo
    localStorage.setItem("nombreJugadoresJSON", JSON.stringify(nombreJugadores)); // Y guardo un string en formato JSON con los nombres

    window.location.href = "../html/pantallaPartida.html"; // Lo mando al juego
})

// Básicamente esta función es para no tener un div ya creado y que se cree únicamente cuando haya un error
function crearMensajeError(mensaje){
    const posibleDiv = document.getElementById("divContenedor"); // Intento obtener un posible div donde irían mensajes de errores

    // Suponiendo que exista el div
    if (posibleDiv !== null){
        document.getElementById("mensajeError").textContent = mensaje; // Cambio el error del mensaje que había antes por el nuevo (no necesariamente) que mando por parámetro
        return;
    } else {
        // Creo el div donde irá el nombre del error y el mensaje en si del error
        const div = document.createElement("div"); 
        const mensajeError = document.createElement("p");

        // Y les doy atributos
        div.setAttribute("id", "divContenedor");
        div.classList.add("mt-5");
        div.style.color = "red";

        mensajeError.setAttribute("id", "mensajeError")

        mensajeError.textContent = mensaje; // Le pongo de textContent el mensaje que mandé por parámetro
        div.appendChild(mensajeError); // y lo appendeo al div que cree

        document.getElementById("containerPrincipal").appendChild(div); // Luego este div lo appendeo al container
        return;
    }
}

// Suponiendo que haya un tablero almacenado, va a crear un botón que sea de continuar
if (JSONdeTablero !== null) {
    const div = document.getElementById("divNuevoBoton"); // Este div es en realidad donde van los botones

    const button = document.createElement("button");
    button.textContent = "Volver a partida pasada";
    button.classList.add("btn-primary", "btn", "col-2", "mx-auto");
    button.setAttribute("id", "botonPartidaContinuar");
    
    // Que tendrá un eventListener que te llevará a la partida
    button.addEventListener('click', () => {
        window.location.href = "../html/pantallaPartida.html";
    });

    // Le appendeo el botón al div
    div.appendChild(button);
}
