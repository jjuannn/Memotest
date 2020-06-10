let $primerCuadro = null
let turno = 0

const $cuadros = document.querySelectorAll(".cuadro")
const $tablero = document.querySelector("#tablero")
const $mensajeFinJuego = document.querySelector('#fin-juego');

function configurarJuego(){
    const coloresBase = ["rojo", "azul", "verde", "amarillo", "negro", "blanco"]
    const coloresDuplicados = coloresBase.concat(coloresBase)
    configurarCuadros($cuadros, coloresDuplicados)
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

let contador = 0

function manejarClickCuadro($cuadroActual){
    mostrarCuadro($cuadroActual)
    

    if($primerCuadro === null){
        $primerCuadro = $cuadroActual
        
    } else{

        if($primerCuadro === $cuadroActual){
            return 
        }

        turno++
    
        if(compararCuadros($primerCuadro, $cuadroActual)){
            eliminarCuadro($primerCuadro)
            eliminarCuadro($cuadroActual)
            contador++
            if(contador === 6){
                $tablero.style.display = 'none';
                $mensajeFinJuego.querySelector('strong').textContent = turno .toString();
                $mensajeFinJuego.style.display = 'block';
            }
            bloquearInputUsuario()
        }else{
            ocultarCuadro($primerCuadro)
            ocultarCuadro($cuadroActual)   
        }

        $primerCuadro = null

    }    
        
}

function eliminarCuadro($cuadro){
    setTimeout(function(){
        $cuadro.parentElement.classList.add("completo")
        $cuadro.remove()
        
    }, 500)
}

function bloquearInputUsuario(){
    $tablero.onclick = function(){

    }
    setTimeout(function(){
        manejarRondas($tablero)
    }, 500)
}

function evaluarFinDeJuego(){
    if(document.querySelectorAll(".completo").length === 12){
        $tablero.style.display = 'none';
        $mensajeFinJuego.querySelector('strong').textContent = turno .toString();
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
    return $cuadro2.className === $cuadro1.className
}

configurarJuego()