import {
  options,
  popupButton,
  soundToggle,
  updateLocalSoundSrc,
  getLocalSoundSrc,
  playMusic,
  hoverMusic,
  clickMusic,
  checkPlayable,
} from "./modules/music.js";

import {
  body,
  infoIcon,
  creditMenu,
  settingIcon,
  levelMenu,
  popup,
  settingsView,
  infoView,
  creditsView,
  nameEditIcon,
  nameInput,
  userChangeButton,
  editName,
  getUserName,
  classWorker,
  containsClass,
  updatePopup,
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
    classWorker("none", "remove", fire);
  });
  menu.addEventListener("mouseleave", function () {
    let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
    classWorker("none", "add", fire);
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
  classWorker("blur", "remove", body);
  classWorker("not-home", "add", body);
  classWorker("popup__active", "remove", popup);
  classWorker("none", "add", popup);
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
  containsClass(popup, "popup__active") ? "" : playMusic(playable);
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
