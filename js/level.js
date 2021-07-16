import {
  themeAudio,
  soundToggle,
  updateLocalSoundSrc,
  getLocalSoundSrc,
  handleThemePromise,
  playMusic,
  checkPlayable,
} from "./modules/music.js";
import {
  body,
  settings,
  info,
  infoIcon,
  creditMenu,
  settingIcon,
  levelMenu,
  popup,
  credits,
  settingsView,
  infoView,
  creditsView,
  check,
  nameEditIcon,
  nameInput,
  popupUsername,
  userChangeButton,
  editName,
  positionCursor,
  setUserName,
  getUserName,
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
