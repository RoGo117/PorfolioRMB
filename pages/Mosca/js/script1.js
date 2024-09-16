let jugar = document.getElementById("jugar");

//Configuración
let avatar = document.getElementById("avatar");
let fondo = document.getElementById("fondo");
let tamanio = document.getElementById("tamanio");

let mosca_juego = document.getElementById("mosca_juego");
let fondo_juego = document.getElementById("fondo_juego");

//Imágenes para los
let imagenestamanio = tamanio.querySelectorAll("IMG");

//Para mostrar los valores de los marcadores
let centesimas = document.getElementById("centesimas");
let segundos = document.getElementById("segundos");
let puntos = document.getElementById("puntos");

//Contadores marcadores tiempo y puntos
let contcentesimas;
let contsegundos;
let contpuntos;

//Timer
let tiempo;

//Tiempo que dura el juego
let tiempolimite;

//Inicialización de cada jugada y comienzo del juego
const inicializarJuego = () => {
  contcentesimas = 0;
  contsegundos = 0;
  contpuntos = 0;
  puntos.textContent = "00";
  centesimas.textContent = "00";
  segundos.textContent = "00";
  //Bucle del juego
  tiempo = setInterval(cronometro, 10);
  jugar.disabled = true;
};

//Cronómetro
const cronometro = () => {
  tiempolimite = 30;
  if (contsegundos < tiempolimite) {
    if (contcentesimas < 99) {
      contcentesimas++;
      centesimas.textContent = ":" + ("0" + contcentesimas).slice(-2);
    }
    if (contcentesimas === 99) {
      contcentesimas = 0;
    }
    if (contcentesimas === 0) {
      contsegundos++;
      segundos.textContent = ":" + ("0" + contsegundos).slice(-2);
    }
  } else {
    clearInterval(tiempo);
    //Para que no se pueda pulsar el botón de jugar cuando se está jugando,
    //ya que se inicializa el marcador de tiempos
    jugar.disabled = false;
  }
};

//Configuración del Avatar
const configurarAvatar = (event) => {
  let avataraux = event.target;
  if (avataraux.nodeName === "IMG") {
    mosca_juego.src = avataraux.src;
    console.log(imagenestamanio);
    for (let imagen of imagenestamanio) {
      imagen.src = avataraux.src;
    }
  }
};

//Configuración del Fondo
const configurarFondo = (event) => {
  let fondoaux = event.target;
  if (fondoaux.nodeName === "IMG") {
    fondo_juego.style.backgroundImage = "url(" + fondoaux.src + ")";
  }
};

//Configuración del Tamaño
const configurarTamanio = (event) => {
  let tamanioaux = event.target;
  if (tamanioaux.nodeName === "IMG") {
    mosca_juego.style.width = tamanioaux.clientWidth + "px";
    mosca_juego.style.height = tamanioaux.clientHeight + "px";
  }
};

const moverMosca = () => {
  if (contsegundos < tiempolimite) {
    //Obtenermos un valor aleatorio, que va a ser menor que el ancho y el alto del
    //contenedor del juego
    let x = Math.floor(Math.random() * (fondo_juego.clientWidth - mosca_juego.clientWidth - 10));
    let y = Math.floor(Math.random() * (fondo_juego.clientHeight - mosca_juego.clientHeight - 10));

    mosca_juego.style.left = x + "px";
    mosca_juego.style.top = y + "px";
    puntos.textContent = ("0" + ++contpuntos).slice(-2);
  }
};

//----------------------------------------------------------------------
//Eventos
//----------------------------------------------------------------------

jugar.addEventListener("click", inicializarJuego);
avatar.addEventListener("click", configurarAvatar);
fondo.addEventListener("click", configurarFondo);
tamanio.addEventListener("click", configurarTamanio);
mosca_juego.addEventListener("click", moverMosca);
