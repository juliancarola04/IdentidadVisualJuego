// Para ver el tema de las clases: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

export class Jugador {

    // Lo ideal sería poner estas propiedades en privado y después modificar sus valores con los setters,
    // pero hay problemas con el JSON si se hace. Investigar un poco más después.
    puntajeActual;
    puntajeTotal;
    rondasGanadas;
    tiroDado;
    
    // Sol, JS a diferencia de C# no puede tener varios constructores, así que para que después se pueda utilizar esta clase
    // a la hora de empezar una partida con datos ya guardados tengo que ponerle varios parámetros que por defecto empiezan en 0. 
    // Cuando se pasa un valor correspondiente a esos campos se cambia el valor por defecto al que se pasó.  
    constructor (nombre, puntajeActual = 0, puntajeTotal = 0, rondasGanadas = 0, tiroDado = false){
        this.nombre = nombre;
        this.puntajeActual = puntajeActual;
        this.puntajeTotal = puntajeTotal;
        this.rondasGanadas = rondasGanadas;
        this.tiroDado = tiroDado;
    }

    // Para ver el tema de los getters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    // La diferencia es que no requieren llamarlos como si fueran métodos (más parecido a las propiedades de C#)
    get getNombre(){
        return this.nombre;
    }

    get getPuntajeActual(){
        return this.puntajeActual;
    }    

    get getPuntajeTotal(){
        return this.puntajeTotal;
    }
    get getRondasGanadas(){
        return this.rondasGanadas;
    }

    get getTiradoDado(){
        return this.tiroDado;
    }

    // Para ver el tema de los setters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
    set setPuntajeActual(puntajeActual){
        this.puntajeActual = puntajeActual;
    }

    set setPuntajeTotal(puntajeTotal){
        this.puntajeTotal = puntajeTotal;
    }
    
    set setRondasGanadas(rondasGanadas){
        this.rondasGanadas = rondasGanadas;
    }

    set setTiroDado(tiroDado){
        this.tiroDado = tiroDado;
    }

    // Para ver el tema del random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    tirarDado(){
        if (this.tiroDado === false){
            this.setTiroDado = true;
            
            const resultadoRandom = Math.floor((Math.random() * 6) + 1);

            // Esto va a andar, pero no se va a actualizar en el DOM de una. Se debería de modularizar un poco y quitar cosas de la clase.
            // Mañana reviso bien a ver que onda. Para mí en el addEventListener habría que llamar a esta función y tratarla únicamente
            // como el generar un número random. El resto de cosas se hacen dentro de la función anónima del addEventListener. 
            this.setPuntajeTotal = this.getPuntajeTotal + resultadoRandom;
            this.setPuntajeActual = resultadoRandom;
            return resultadoRandom;
        }
        else {
            return false;
        }
    }
}

export class Tablero {
    
    rondaActual;
    resultadoDado;

    constructor (jugadorUno, jugadorDos, rondaActual = 0, resultadoDado = 0){
        this.jugadorUno = jugadorUno;
        this.jugadorDos = jugadorDos;
        this.rondaActual = rondaActual;
        this.resultadoDado = resultadoDado
    }

    set setResultadoDado(resultadoDado){
        this.resultadoDado = resultadoDado;
    }

    set setRondaActual(rondaActual){
        this.rondaActual = rondaActual;
    }

    guardarEstado(){
        // Yo esto no lo sabía, pero tiene lógica. Si usás "this" nada más se refiere a el objeto que invocó a la función. Re útil para lo que quiero hacer.
        localStorage.setItem("tableroJSON", JSON.stringify(this)); 
    }

    actualizarRonda() {
    // Si ambos jugadores ya tiraron
    if (this.jugadorUno.getTiradoDado && this.jugadorDos.getTiradoDado) {
        this.rondaActual++;

        // Ejemplo: sumar puntaje total o decidir ganador de ronda
        if (this.jugadorUno.getPuntajeActual > this.jugadorDos.getPuntajeActual) {
            this.jugadorUno.puntajeTotal++;
            this.jugadorUno.rondasGanadas++;
        } else if (this.jugadorDos.getPuntajeActual > this.jugadorUno.getPuntajeActual) {
            this.jugadorDos.puntajeTotal++;
            this.jugadorDos.rondasGanadas++;
        }



        // Resetear sus tiros
        this.jugadorUno.tiroDado = false;
        this.jugadorDos.tiroDado = false;

        this.guardarEstado();
        // Verificar si alguien ganó
        if (this.jugadorUno.rondasGanadas >= 5 || this.jugadorDos.rondasGanadas >= 5) {
                return this.obtenerGanador();
            }
        }
        // 🔹 Si no terminó el juego, devolvemos null
        return null;
}
    obtenerGanador() {
        return (this.jugadorUno.rondasGanadas > this.jugadorDos.rondasGanadas)
            ? this.jugadorUno
            : this.jugadorDos;
    }
}