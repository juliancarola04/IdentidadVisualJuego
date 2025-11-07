const boton = document.getElementById("btn-empezar");
const JSONdeTablero = JSON.parse(localStorage.getItem("tableroJSON"));

boton.addEventListener('click', () => {
    const inputTextP1 = document.getElementById('jugador1');
    const inputTextP2 = document.getElementById('jugador2');

    const valorInputP1 = inputTextP1.value.trim();
    const valorInputP2 = inputTextP2.value.trim();

    if (valorInputP1 === "" && valorInputP2 === ""){
        crearMensajeError("Te olvidaste de introducir los nombres de los jugadores.");
        return;  
    } else if (valorInputP1 === "") {
        crearMensajeError("Te olvidaste de introducir el nombre del jugador 1.");       
        return;
    } else if (valorInputP2 === "") {
        crearMensajeError("Te olvidaste de introducir el nombre del jugador 2.");
        return;
    }

    const nombreJugadores = [valorInputP1, valorInputP2];
    localStorage.removeItem("tableroJSON");
    localStorage.setItem("nombreJugadoresJSON", JSON.stringify(nombreJugadores));

    window.location.href = "../html/pantallaPartida.html";
})

function crearMensajeError(mensaje){
    const posibleDiv = document.getElementById("divContenedor");

    if (posibleDiv !== null){
        document.getElementById("mensajeError").textContent = mensaje;
        return;
    } else {
        const div = document.createElement("div");
        const mensajeError = document.createElement("p");

        div.setAttribute("id", "divContenedor");
        div.classList.add("mt-5");
        div.style.color = "red";
        mensajeError.setAttribute("id", "mensajeError")

        mensajeError.textContent = mensaje;
        div.appendChild(mensajeError);

        document.getElementById("containerPrincipal").appendChild(div);
        return;
    }
}

if (JSONdeTablero !== null) {
    const div = document.getElementById("divNuevoBoton");

    const button = document.createElement("button");
    button.textContent = "Volver a partida pasada";
    button.classList.add("btn-primary", "btn", "col-2", "mx-auto");
    button.setAttribute("id", "botonPartidaContinuar");
    button.addEventListener('click', () => {
        window.location.href = "../html/pantallaPartida.html";
    });
    div.appendChild(button);
}
