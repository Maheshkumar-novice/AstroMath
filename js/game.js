import {
  soundToggle,
  updateLocalSoundSrc,
  getLocalSoundSrc,
  playMusic,
  checkPlayable
} from "./modules/music.js";
import { body, containsClass, timer, updateLocal, getLocal } from "./modules/utils.js";

// Utils - Options
const options = [...document.querySelectorAll(".footer__option")];
const colorMap = {
  invertedColor: "var(--primary-color)",
  invertedBackground: "var(--secondary-color)",
  normalColor: "var(--secondary-color)",
  normalBackground: "var(--primary-color)",
};
const keys = {
  a: options[0],
  s: options[1],
  d: options[2],
  1: options[0],
  2: options[1],
  3: options[2],
};

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    triggerOption(option.dataset.option);
    console.log(option.dataset.value);
  });
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
    case "s":
    case "d":
      triggerOption(e.key);
      console.log(keys[e.key].dataset.value);
  }
});

function triggerOption(key) {
  invertColor(keys[key]);
  setTimeout(() => {
    normaliseColor(keys[key]);
  }, 200);
}

function invertColor(key) {
  key.style.color = colorMap.invertedColor;
  key.style.background = colorMap.invertedBackground;
  key.style.boxShadow = "2px 3px black";
}

function normaliseColor(key) {
  key.style.color = colorMap.normalColor;
  key.style.background = colorMap.normalBackground;
  key.style.boxShadow = "5px 5px black";
}

// Utils - Game Logic

// Timer
timer("20");

// Music
let soundSrc;
let playable;

soundToggle.addEventListener("click", (e) => {
  soundSrc = soundToggle.src;
  if (soundSrc.includes("soundon")) {
    soundToggle.src = "./assets/images/soundoff.svg";
    updateLocal("currentSoundSrc", "./assets/images/soundoff.svg");
    playable = false;
  } else {
    soundToggle.src = "./assets/images/soundon.svg";
    updateLocal("currentSoundSrc", "./assets/images/soundon.svg");
    playable = true;
  }
  playMusic(playable);
});

window.onload = function () {
  if (containsClass(body, "not-home")) {
    soundToggle.src = getLocal("currentSoundSrc") || soundToggle.src;

    if (checkPlayable()) {
      playable = true;
    }
    playMusic(playable);
  } else {
    getLocal("currentSoundSrc")
      ? ((soundToggle.src = getLocal("currentSoundSrc")), (playable = checkPlayable()))
      : (updateLocalSoundSrc(soundToggle.src), (playable = true));
  }
};
