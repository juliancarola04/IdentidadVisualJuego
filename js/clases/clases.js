// Para ver el tema de las clases: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

export class Jugador {
    // Lo ideal sería poner estas propiedades en privado y después modificar sus valores con los setters,
    // pero hay problemas con el JSON si se hace. Investigar un poco más después.
    puntajeActual;
    puntajeTotal;
    rondasGanadas;
    
    // Sol, JS a diferencia de C# no puede tener varios constructores, así que para que después se pueda utilizar esta clase
    // a la hora de empezar una partida con datos ya guardados tengo que ponerle varios parámetros que por defecto empiezan en 0. 
    // Cuando se pasa un valor correspondiente a esos campos se cambia el valor por defecto al que se pasó.  
    constructor (nombre, puntajeActual = 0, puntajeTotal = 0, rondasGanadas = 0){
        this.nombre = nombre;
        this.puntajeActual = puntajeActual;
        this.puntajeTotal = puntajeTotal;
        this.rondasGanadas = rondasGanadas;
    }

    // Para ver el tema de los getters: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    // La diferencia es que no requieren llamarlos como si fueran métodos (más parecido a las propiedades de C#)
    get getNombre(){
        return this.nombre;
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

    // Para ver el tema del random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    tirarDado(){
        return Math.floor((Math.random() * 6) + 1);
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
}