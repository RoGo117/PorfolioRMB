let avatar = document.getElementById("avatar");
let fondo = document.getElementById("fondo");
let tamanio = document.getElementById("tamanio");
let fondo_juego = document.getElementById("fondo_juego");
let mosca_juego = document.getElementById("mosca_juego");
let jugar = document.getElementById("jugar");
let segundos = document.getElementById("segundos");
let centesimas = document.getElementById("centesimas");
let intervaloCronometro;
let punto = document.getElementById("puntos");
let finish = false;

const cambiarfondo=(event) => {
    console.log(event.target);
    if (event.target.tagName === 'IMG') {
        fondo_juego.style.backgroundImage = `url(${event.target.src})`;
    }
};

fondo.addEventListener("click",cambiarfondo);


const cambiartamanio=(event) => {
    if (event.target.tagName === 'IMG') {
        console.log(event.target.offsetHeight);
        mosca_juego.style.height = event.target.offsetHeight + "px";
        mosca_juego.style.width = event.target.offsetWidth + "px";
        // mosca_juego.className=mosca_juego.className+" "+event.target.className
    }
};

tamanio.addEventListener("click",cambiartamanio);


const cambiaravatar=(event) => {
    if(event.target.tagName === 'IMG'){
        mosca_juego.src=event.target.src
    }
};

avatar.addEventListener("click",cambiaravatar);


const iniciarCronometro = () => {
    let startTime = Date.now(); // Tiempo de inicio del cronómetro
    intervaloCronometro = setInterval(() => {
        let tiempoTranscurrido = Date.now() - startTime;
        let segundosPasados = Math.floor(tiempoTranscurrido / 1000);
        let centesimasPasadas = Math.floor((tiempoTranscurrido % 1000) / 10)
        segundos.textContent = segundosPasados < 10 ? "0"+segundosPasados: segundosPasados;
        centesimas.textContent = centesimasPasadas < 10 ? ":0"+centesimasPasadas : ":"+centesimasPasadas;
        if(segundosPasados==10){
            finish=true
            clearInterval(intervaloCronometro)
        }
    }, 10); // Actualiza cada 10 milisegundos (centésima de segundo)

};

const sumarPunto = () => {
    if(finish){

    } else {
    let puntosActuales = parseInt(punto.textContent);
    punto.textContent = puntosActuales + 1;
    }
};

const cambiarPosicionMosca = () => {
    if(finish){

    } else {
    let posicionX = Math.random() * (fondo_juego.offsetWidth - mosca_juego.offsetWidth);
    let posicionY = Math.random() * (fondo_juego.offsetHeight - mosca_juego.offsetHeight);
    mosca_juego.style.left = posicionX + "px";
    mosca_juego.style.top = posicionY + "px";
    }
};

const cambiar = (event) => {
    if (event.target.id === 'mosca_juego') {
        console.log(event.target)
        sumarPunto();
        cambiarPosicionMosca();
    }
};


jugar.addEventListener("click", () => {
    finish=false
    punto.textContent=0;
    cambiarPosicionMosca();
    clearInterval(intervaloCronometro); // Limpiar intervalo existente
    iniciarCronometro(); // Iniciar el cronómetro
    mosca_juego.addEventListener("click", cambiar); // Agregar event listener para sumar puntos
});





//IGNORAR TOTALMENTE

document.addEventListener("DOMContentLoaded", function() {
    var imgNoDrag = document.getElementById('mosca_juego');
    imgNoDrag.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
});