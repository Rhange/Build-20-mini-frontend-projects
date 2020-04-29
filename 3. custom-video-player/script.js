const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");

let currentTimeVal = document.getElementById("current");
let totalTimeVal = document.getElementById("total");
let rangeBar = document.querySelector("input");

const handleClickPlay = (e) => {
  if (video.paused === true) {
    video.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.classList.add("pause");

    video.removeEventListener("click", handleClickPlay);
    video.addEventListener("click", handleClickPause);

    playBtn.removeEventListener("click", handleClickPlay);
    playBtn.addEventListener("click", handleClickPause);
  }
  setInterval(currentTimeStamp, 1000);
};

const handleClickPause = (e) => {
  if (video.paused === false) {
    video.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.remove("pause");

    video.removeEventListener("click", handleClickPause);
    video.addEventListener("click", handleClickPlay);

    playBtn.removeEventListener("click", handleClickPause);
    playBtn.addEventListener("click", handleClickPlay);
  }
};

const handleClickReset = () => {
  video.currentTime = 0;
  video.pause();
};

const timeConverter = (totalSeconds) => {
  minutes = Math.floor(totalSeconds / 60);
  seconds = Math.floor(totalSeconds - minutes * 60);
  result = `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
  return result;
};

const totalTimeStamp = () => {
  const duration = video.duration;
  totalTimeVal.innerText = timeConverter(duration);
};

const currentTimeStamp = () => {
  const current = video.currentTime;
  currentTimeVal.innerText = timeConverter(current);
};

const handleInputRange = (e) => {
  console.log(e.target.max);
  let range = e.target;
  video.currentTime = range.value;
  range.max = video.duration;
};

init = () => {
  video.addEventListener("loadedmetadata", totalTimeStamp);
  video.addEventListener("click", handleClickPlay);
  playBtn.addEventListener("click", handleClickPlay);
  resetBtn.addEventListener("click", handleClickReset);
  rangeBar.addEventListener("input", handleInputRange);
};

init();
