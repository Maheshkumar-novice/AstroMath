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
} from "./modules/utils.js";

// Utils
let editing = true;
settingIcon.addEventListener("click", settingsView);
infoIcon.addEventListener("click", infoView);
creditMenu.addEventListener("click", creditsView);

nameEditIcon.addEventListener("click", () => {
  editing = editName(editing);
});
userChangeButton.addEventListener("click", (e) => {
  settingsView();
  nameEditIcon.click();
});

// Music
let soundSrc;
let playable;
let menubtn = document.querySelectorAll(".main__option");

menubtn.forEach((menu) => {
  menu.addEventListener("mouseenter", function () {
    let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
    fire.classList.remove("none");
  });
  menu.addEventListener("mouseleave", function () {
    let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
    fire.classList.add("none");
  });
});

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
  popup.classList.contains("popup__active") ? "" : playMusic(playable);
});

window.onload = function () {
  nameInput.value = getUserName();
  popupUsername.textContent = nameInput.value;
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
