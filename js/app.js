
var url = window.location.href;
var swLocation = 'https://lallegadoraradio.com/sw.js';

if (navigator.serviceWorker) {

  if (url.includes('localhost')){
    swLocation = '/sw.js';
  }

  navigator.serviceWorker.register(swLocation);
}



let title = '<span class="cc_streaminfo" data-type="trackartist" data-username="lallega4"></span> - <span class="cc_streaminfo" data-type="tracktitle" data-username="lallega4"></span>';
let player;
let dur;
let isPlaying = false;

$('.title').html(title);

console.log("reproductor V2");

// Obtener el elemento <audio> por su ID
const audio = document.getElementById("myAudio");
const loader = document.getElementById("loader");
const playBtn = document.getElementById("play-btn");

// Establecer el atributo 'src' del elemento <audio>
audio.src = "https://sseg.us/proxy/lallega4?mp=/stream";

// Preload automático para optimizar la reproducción
audio.preload = "auto";

// Mostrar el loader al iniciar la reproducción
loader.style.display = "block";

// Reproducir el audio
audio.play()
  .then(() => {
    console.log("Ha comenzado a reproducirse el sonido...");
    loader.style.display = "none"; // Ocultar el loader cuando comience la reproducción
  })
  .catch(error => {
    console.error("Error al reproducir el sonido:", error);
    loader.style.display = "none"; // Ocultar el loader si hay un error
  });

// Gestión del botón de reproducción/pausa
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    // Restablecer la fuente de audio al reanudar la reproducción
    audio.src = "https://sseg.us/proxy/lallega4?mp=/stream";
    loader.style.display = "block"; // Mostrar el loader al iniciar la reproducción
    audio.play()
        .then(() => {
          console.log("El usuario comenzó la reproducción");
          loader.style.display = "none"; // Ocultar el loader cuando comience la reproducción
          updateTrackInfo();
        })
        .catch(error => {
          console.error("Error al reproducir la estación:", error);
          loader.style.display = "none"; // Ocultar el loader si hay un error
        });
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    audio.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
});

function updateTrackInfo() {
  // Aquí puedes agregar lógica para actualizar la información del track actual
  // Por ejemplo, usando una función de la API para obtener información de la emisora
  console.log("Información del track actual actualizada");
}

// promptInstallButton
window.addEventListener("beforeinstallprompt", e => {
  console.log(`> beforeinstallprompt fired with platforms: ${e.platforms.join(',')}\r\n`);
  
  // pre.append(`> beforeinstallprompt fired with platforms: ${e.platforms.join(',')}\r\n`);
  const showDefaultPrompt = new URLSearchParams(location.search).has(
    "showDefaultPrompt"
  );
  if (showDefaultPrompt) {

    console.log("Default PWA mini info-bar on mobile should show up. Clear site settings if not.\r\n");
    
    // pre.append(
    //   "Default PWA mini info-bar on mobile should show up. Clear site settings if not.\r\n"
    // );
    return;
  }
  promptButton.hidden = false;
  e.preventDefault();
  e.userChoice.then(result =>
    console.log(`userChoice resolved with: ${JSON.stringify(result)}\r\n`)
    
    // pre.append(`userChoice resolved with: ${JSON.stringify(result)}\r\n`)
  );
  promptButton.onclick = () => {
    console.log("Waiting for user choice...\r\n");
    
    // pre.append(
    //   "Waiting for user choice...\r\n"
    // );
    e.prompt();
  };
});

// Fin promptInstallButton
