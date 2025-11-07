// Para ver el tema de las clases: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

export class Jugador {

    // Lo ideal sería poner estas propiedades en privado y después modificar sus valores con los setters,
    // pero hay problemas con el JSON si se hace. Investigar un poco más después.
    puntajeActual;
    puntajeTotal;
    rondasGanadas;
    tiroDado;
    numeroTiradas;
    
    // Sol, JS a diferencia de C# no puede tener varios constructores, así que para que después se pueda utilizar esta clase
    // a la hora de empezar una partida con datos ya guardados tengo que ponerle varios parámetros que por defecto empiezan en 0. 
    // Cuando se pasa un valor correspondiente a esos campos se cambia el valor por defecto al que se pasó.  
    constructor (nombre, puntajeActual = 0, puntajeTotal = 0, rondasGanadas = 0, tiroDado = false, numeroTiradas = 0){
        this.nombre = nombre;
        this.puntajeActual = puntajeActual;
        this.puntajeTotal = puntajeTotal;
        this.rondasGanadas = rondasGanadas;
        this.tiroDado = tiroDado;
        this.numeroTiradas = numeroTiradas;
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

    get getTiroDado(){
        return this.tiroDado;
    }

    get getNumeroTiradas(){
        return this.numeroTiradas;
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

    set setNumeroTiradas(numeroTiradas){
        this.numeroTiradas = numeroTiradas;
    }

    // Para ver el tema del random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    tirarDado(){
        this.setTiroDado = true; // Establezco que el jugador tiró el dado
        
        const resultadoRandom = Math.floor((Math.random() * 6) + 1); // Genera un valor aleatorio entre 1 y 6. Si no se le suma 1 no va a incluir al 6.

        // Y establezco cuál es su resultado total y actual.
        this.setPuntajeActual = resultadoRandom;
        this.setPuntajeTotal = this.getPuntajeTotal + resultadoRandom;
        return resultadoRandom;
    }
}

export class Tablero {
    
    rondaActual;
    resultadoDado;
    jugadorUno;
    jugadorDos;
    dadoSiendoTirado;
    hayGanador;

    constructor (jugadorUno, jugadorDos, rondaActual = 1, resultadoDado = 0, dadoSiendoTirado = false, hayGanador = false){
        this.jugadorUno = jugadorUno;
        this.jugadorDos = jugadorDos;
        this.rondaActual = rondaActual;
        this.resultadoDado = resultadoDado;
        this.dadoSiendoTirado = dadoSiendoTirado;
        this.hayGanador = hayGanador;
    }

    set setResultadoDado(resultadoDado){
        this.resultadoDado = resultadoDado;
    }

    set setRondaActual(rondaActual){
        this.rondaActual = rondaActual;
    }

    set setDadoSiendoTirado(dadoSiendoTirado){
        this.dadoSiendoTirado = dadoSiendoTirado;
    }

    set setHayGanador(hayGanador){
        this.hayGanador = hayGanador;
    }

    get getRondaActual(){
        return this.rondaActual;
    }

    get getResultadoDado(){
        return this.resultadoDado;
    }
    
    get getDadoSiendoTirado(){
        return this.dadoSiendoTirado;
    }

    get getHayGanador(){
        return this.hayGanador;
    }

    // Función para no repetir miles de veces lo mismo a la hora de guardar
    guardarEstado(){
        localStorage.setItem("tableroJSON", JSON.stringify(this)); 
    }
}