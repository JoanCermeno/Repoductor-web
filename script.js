const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progres = document.querySelector(".progres");
const containerProgres = document.querySelector(".container-progres");
const title = document.querySelector(".title");
const cover = document.querySelector("#cover");

// song titles, osea titulos de sonidos

const songs = ["Goddess_Nightcore", "POP-STARS", "HOPEX-Warrior"];

//keep track of songs
let songIndex = 2;

//initially load song info DOM
loadSong(songs[songIndex]);

//actualizar los detalles de la cansion
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
  updateTimeduration();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function updateProgres(e) {
  /*console.log(e.srcElement.currentTime)*/
  const { duration, currentTime } = e.srcElement;
  const progresPercent = (currentTime / duration) * 100;
  progres.style.width = `${progresPercent}%`;
  //sumamos segundo a segundo...
  document.querySelector("#currenTime").innerText =
    segundosAMinutosSegundos(currentTime);
}

function setProgres(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  /*console.log(clickX);*/
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
//eventos listener
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function updateTimeduration() {
  //set value in the DOM, but watin one second
  setTimeout(() => {
    const endSond = segundosAMinutosSegundos(audio.duration);
    document.querySelector("#timeEndSond").innerText = endSond;
  }, 250);
}

function segundosAMinutosSegundos(segundos) {
  // Calculamos los minutos y segundos como en la respuesta anterior
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;

  // Formateamos los valores, asegurando dos dígitos y eliminando decimales
  const minutosFormateados = String(minutos).padStart(2, "0");
  const segundosFormateados = String(Math.floor(segundosRestantes)).padStart(
    2,
    "0"
  ); // Usamos Math.floor para eliminar decimales

  return `${minutosFormateados}:${segundosFormateados}`;
}

//cambiar de cansion Cahnge song event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//barra de progess
audio.addEventListener("timeupdate", updateProgres);

containerProgres.addEventListener("click", setProgres);

audio.addEventListener("ended", nextSong);
