const videoEl = document.getElementById("video");
const playPauseBtn = document.getElementById("play-button");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const volumeIcon = document.getElementById("volumne-icon");
const volumneRange = document.querySelector(".volumne-range");
const volumneBar = document.querySelector(".volumne-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //

function showPlayBtn() {
  playPauseBtn.classList.replace("fa-pause", "fa-play");
  playPauseBtn.setAttribute("title", "Play");
}

function playPuase() {
  if (videoEl.paused) {
    videoEl.play();
    playPauseBtn.classList.replace("fa-play", "fa-pause");
    playPauseBtn.setAttribute("title", "Pause");
  } else {
    videoEl.pause();
    showPlayBtn();
  }
}

// showing play icon when video is ended
videoEl.addEventListener("ended", showPlayBtn);

// Progress Bar ---------------------------------- //

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// EVENT LISTENERS
playPauseBtn.addEventListener("click", playPuase);
