import {
  options,
  popupButton,
  soundToggle,
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
  classWorker,
  containsClass,
  updatePopup,
  updateLocal,
  getLocal,
  settings,
} from "./modules/utils.js";

// Utils
let editing = true;
settingIcon.addEventListener("click", settingsView);
infoIcon.addEventListener("click", infoView);
creditMenu.addEventListener("click", creditsView);
nameEditIcon.addEventListener("click", () => {
  editing = editName(editing);
});

window.addEventListener("keyup", (e) => {
  if(settings.classList.contains("none") || !(e.code=="Enter") || editing) return;
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
const newgame = document.querySelector(".main__newgame--link");
const resume = document.querySelector(".main__resume--link");

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

newgame.addEventListener("click", (e) => {
  e.preventDefault();
  updateLocal("gameTime", 45);
  updateLocal("gameLevel", 1);
  location.href = "./astro-math.html";
});

resume.addEventListener("click", (e) => {
  e.preventDefault();
  updateLocal("gameTime", 35);
  updateLocal("gameLevel", 10);
  location.href = "./astro-math.html";
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
  updateLocal("currentSoundSrc", soundToggle.src);
});

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
  containsClass(popup, "popup__active") ? "" : playMusic(playable);
});

window.onload = function () {
  nameInput.value = getLocal("user") || "Jaam";
  updatePopup(nameInput.value);
  if (containsClass(body, "not-home")) {
    soundToggle.src = getLocal("currentSoundSrc") || soundToggle.src;

    if (checkPlayable()) {
      playable = true;
    }
    playMusic(playable);
  } else {
    getLocal("currentSoundSrc")
      ? ((soundToggle.src = getLocal("currentSoundSrc")),
        (playable = checkPlayable()))
      : (updateLocal("currentSoundSrc", soundToggle.src), (playable = true));
  }
};
