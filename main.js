let turnos = 0
let $primerCuadro = null
const $tablero = document.querySelector("#tablero")
const $cuadros = document.querySelectorAll(".cuadro")
const $mensajeFinJuego = document.querySelector('#fin-juego');

function configurarJuego(){
    const coloresBase = ["rojo", "azul", "verde", "amarillo", "blanco", "negro"]
    const coloresRepetidos = coloresBase.concat(coloresBase) 
    console.log(coloresRepetidos)
    configurarCuadros($cuadros, coloresRepetidos)
    manejarRondas($tablero)
}

function configurarCuadros($cuadros, colores){
    const coloresRandom = colores.sort(function(){
        return 0.5 - Math.random() 
    })

    coloresRandom.forEach(function(color, i){
        $cuadros[i].classList.add(color)
    })

}

function manejarRondas($tablero){
    $tablero.onclick = function(e){
        const $elemento = e.target
        if($elemento.classList.contains("cuadro")){
            manejarClickCuadro($elemento)
        }
    }

}

function manejarClickCuadro($cuadroActual){
    mostrarCuadro($cuadroActual)

    if($primerCuadro === null){
        $primerCuadro = $cuadroActual
    } else{
            
        if($primerCuadro === $cuadroActual){
            return;
        }

        turnos++

        if(compararCuadros($primerCuadro, $cuadroActual)){
            eliminarCuadro($primerCuadro)
            eliminarCuadro($cuadroActual)
        }else{
            ocultarCuadro($primerCuadro)
            ocultarCuadro($cuadroActual)
        }    
        $primerCuadro === null
    }
}

function eliminarCuadro($cuadro) {
    setTimeout(function() {
      $cuadro.parentElement.classList.add('completo');
      $cuadro.remove();
      evaluarFinDeJuego()
    }, 500);
}

function evaluarFinDeJuego(){
    if(document.querySelectorAll(".cuadro").length === 0){
        $tablero.style.display = 'none';
        $mensajeFinJuego.querySelector('strong').textContent = turnos.toString();
        $mensajeFinJuego.style.display = 'block';
    }
}

function mostrarCuadro($cuadro){
    $cuadro.style.opacity = "1"
}

function ocultarCuadro($cuadro){
    setTimeout(function() {
        $cuadro.style.opacity = '0';
    }, 500);
}

function compararCuadros($cuadro1, $cuadro2){
   return $cuadro1.className === $cuadro2.className

}

configurarJuego()


