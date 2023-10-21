const videoEl = document.getElementById("video");
const playPauseBtn = document.getElementById("play-button");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
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

// calculating display time format

function displayTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

// Progress Bar ---------------------------------- //
function updateProgress() {
  let currentTimeNum = video.currentTime;
  let durationNum = video.duration;
  let percent = ((currentTimeNum / durationNum) * 100).toFixed(2);
  progressBar.style.width = `${percent}%`;
  currentTime.textContent = `${displayTime(currentTimeNum)} / `;
  duration.textContent = `${displayTime(durationNum)}`;
}

function setProgress(event) {
  let newTime = event.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //
function changeVolume(event) {
  let volume = event.offsetX / volumeRange.offsetWidth;

  // rounding volume between 0 and 1
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  console.log(volume);
}
// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// EVENT LISTENERS
playPauseBtn.addEventListener("click", playPuase);
video.addEventListener("click", playPuase);
video.addEventListener("timeupdate", updateProgress); //
video.addEventListener("canplay", updateProgress); //
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
