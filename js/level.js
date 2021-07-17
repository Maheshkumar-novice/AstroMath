import {
  soundToggle,
  updateLocalSoundSrc,
  getLocalSoundSrc,
  playMusic,
  checkPlayable,
} from "./modules/music.js";
import {
  body,
  infoIcon,
  settingIcon,
  settingsView,
  infoView,
  nameEditIcon,
  nameInput,
  editName,
  getUserName,
  containsClass,
  updatePopup,
} from "./modules/utils.js";

// Utils
let editing = true;
settingIcon.addEventListener("click", settingsView);
infoIcon.addEventListener("click", infoView);
nameEditIcon.addEventListener("click", () => {
  editing = editName(editing);
});

// Music
let soundSrc;
let playable;

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
  playMusic(playable);
});

window.onload = function () {
  nameInput.value = getUserName();
  updatePopup(nameInput.value);
  if (containsClass(body, "not-home")) {
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
