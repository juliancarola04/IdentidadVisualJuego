// Para ver el tema de las clases: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

export class Jugador {
    constructor (nombre){
        this.nombre = nombre;
    }

    get getNombre(){
        return this.nombre;
    }

    // Para ver el tema del random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    tirarDado(){
        return Math.floor((Math.random() * 6) + 1);
    }
}

export class Tablero {
    
}