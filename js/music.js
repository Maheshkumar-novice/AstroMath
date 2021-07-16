import {
  themeAudio,
  hoverAudio,
  clickAudio,
  options,
  popupButton,
  soundToggle,
  updateLocalSoundSrc,
  getLocalSoundSrc,
  handleThemePromise,
  playMusic,
  hoverMusic,
  clickMusic,
  checkPlayable,
} from "./modules/music.js";

let soundSrc;
let playable;

options.forEach((option) => {
  option.addEventListener("mouseenter", () => {
    if (playable) {
      hoverMusic();
    }
  });
  option.addEventListener("click", () => {
    if (playable) {
      clickMusic();
    }
  });
});

popupButton.addEventListener("click", (e) => {
  document.body.classList.remove("blur");
  document.body.classList.add("not-home");
  popup.classList.remove("popup__active");
  popup.classList.add("none");
  if (checkPlayable()) {
    playMusic(playable);
  }
});

levelMenu.addEventListener("click", (e) => {
  updateLocalSoundSrc(soundToggle.src);
});

soundToggle.addEventListener("click", (e) => {
  soundSrc = soundToggle.src;
  if (soundSrc.includes("soundon")) {
    soundToggle.src = "./assets/images/soundoff.svg";
    updateLocalSoundSrc("./assets/images/soundoff.svg");
    playable = false;
  } else {
    soundToggle.src = "./assets/images/soundon.svg";
    updateLocalSoundSrc("./assets/images/soundon.svg");
    playable = true;
  }
  console.log(popup.classList.contains("none"));
  popup.classList.contains("popup__active")
    ? ""
    : playMusic(playable);
});

window.onload = function () {
  if (document.body.classList.contains("not-home")) {
    soundToggle.src = getLocalSoundSrc() || soundToggle.src;

    if (checkPlayable()) {
      playable = true;
    }
    playMusic(playable);
  } else {
    getLocalSoundSrc()
      ? ((soundToggle.src = getLocalSoundSrc()), (playable = checkPlayable()))
      : (updateLocalSoundSrc(soundToggle.src), (playable = true));
  }
};
