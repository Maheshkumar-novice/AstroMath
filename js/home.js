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
  getLevelTime,
} from "./modules/utils.js";

const themeAud = document.querySelector(".audio__theme");

// Utils
let editing = true;
settingIcon.addEventListener("click", settingsView);
infoIcon.addEventListener("click", infoView);
creditMenu.addEventListener("click", creditsView);
nameEditIcon.addEventListener("click", () => {
  editing = editName(editing);
});

window.addEventListener("keyup", (e) => {
  if (settings.classList.contains("none") || !(e.code == "Enter") || editing)
    return;
  editing = editName(editing);
});

userChangeButton.addEventListener("click", (e) => {
  settingsView();
  nameEditIcon.click();
});

function updateCurrentLevel() {
  levelMenu.querySelector(".footer__currentlevel").innerText =
    getLocal("currentLevel") || 1;
}

// Music
let soundSrc;
let playable;
// let menubtn = document.querySelectorAll(".main__option");
const newgame = document.querySelector(".main__newgame--link");
const resume = document.querySelector(".main__resume--link");

// menubtn.forEach((menu) => {
//   menu.addEventListener("mouseenter", function () {
//     if(this.dataset.value == "resume" && !getLocal("currentLevel")){
//       return;
//     }
//     let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
//     classWorker("none", "remove", fire);
//   });
//   menu.addEventListener("mouseleave", function () {
//     let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
//     classWorker("none", "add", fire);
//   });
// });

let levelValue = JSON.stringify({
  1: ["current", null, null, 5],
  2: ["locked", null, null, 6],
  3: ["locked", null, null, 7],
  4: ["locked", null, null, 8],
  5: ["locked", null, null, 9],
  6: ["locked", null, null, 10],
  7: ["locked", null, null, 11],
  8: ["locked", null, null, 12],
  9: ["locked", null, null, 15],
  10: ["locked", null, null, 15],
});

newgame.addEventListener("click", (e) => {
  e.preventDefault();
  updateLocal("levelValue", levelValue);
  updateLocal("gameTime", 45);
  updateLocal("gameLevel", 1);
  updateLocal("gameQuestions", 5);
  updateLocal("currentLevel", 1);
  updateLocal("allDone", "no");
  updateLocal("soundTime", themeAud.currentTime);
  location.href = "./astro-math.html";
});

resume.addEventListener("click", (e) => {
  e.preventDefault();
  if(resume.classList.contains("not-active")) return;
  let currentLevel = getLocal("currentLevel") || 1;
  let levelValue = JSON.parse(getLocal("levelValue")) || {
    1: ["current", null, null, 5],
  };
  updateLocal("gameTime", getLevelTime(currentLevel));
  updateLocal("gameBestTime", levelValue[currentLevel][1]);
  updateLocal("gamePercentage", levelValue[currentLevel][2]);
  updateLocal("gameQuestions", levelValue[currentLevel][3]);
  updateLocal("gameLevel", currentLevel);
  updateLocal("soundTime", themeAud.currentTime);
  location.href = "./astro-math.html";
});

options.forEach((option) => {
  option.addEventListener("mouseenter", function(){
    if(this.dataset.value == "resume" && !getLocal("currentLevel")){
      return;
    }
    this.querySelector("a").classList.add("orange");
    let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
    classWorker("none", "remove", fire);
    if (playable) {
      hoverMusic();
    }
  });
  option.addEventListener("mouseleave", function () {
    this.querySelector("a").classList.remove("orange");
    let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
    classWorker("none", "add", fire);
  });
  // option.addEventListener("click", () => {
  //   if (playable) {
  //     clickMusic();
  //   }
  // });
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
  updateLocal("soundTime", themeAud.currentTime);
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
  if(!getLocal("currentLevel")){
    options[0].querySelector("a").classList.add("not-active");
  }
  updateCurrentLevel();
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