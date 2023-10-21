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
const speed = document.querySelector(".player-speed");
const player = document.querySelector(".player");

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

  // changing icon depending volume
  volumeIcon.className = ""; // because don´t have class yet
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}

function toggleMute() {
  let previusVolume = video.volume;
  if (!video.muted) {
    video.muted = true;
    volumeBar.style.width = `0%`;
    volumeIcon.classList.add("fa-volume-mute");
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.muted = false;
    volumeBar.style.width = `${previusVolume * 100}%`;
    volumeIcon.setAttribute("title", "Mute");
    volumeIcon.classList.remove("fa-volume-mute");
    if (previusVolume > 0.7) {
      volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (previusVolume < 0.7 && previusVolume > 0) {
      volumeIcon.classList.add("fas", "fa-volume-down");
    }
  }
}

// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}
// Fullscreen ------------------------------- //
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let fullscreen = false;
function toggleFullScreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// EVENT LISTENERS
playPauseBtn.addEventListener("click", playPuase);
video.addEventListener("click", playPuase);
video.addEventListener("timeupdate", updateProgress); //
video.addEventListener("canplay", updateProgress); //
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullScreen);
