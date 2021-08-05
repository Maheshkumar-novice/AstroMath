export const themeAudio = document.querySelector(".audio__theme");
export const hoverAudio = document.querySelector(".audio__hover");
export const clickAudio = document.querySelector(".audio__click");
export const options = document.querySelectorAll(".main__option");
export const popupButton = document.querySelector(".popup__button");
export const gameSound = document.querySelector(".header__info--sound");
export const soundToggle = document.querySelector(".settings__sound--icon");
export const audioGame = document.querySelectorAll(".audio__game");

export function updateLocalSoundSrc(src) {
  localStorage.setItem("currentSoundSrc", src);
}

export function getLocalSoundSrc() {
  return localStorage.getItem("currentSoundSrc");
}

export function handleThemePromise(promise) {
  promise.catch((err) => {
    if (err) {
      soundToggle.src = "./assets/images/soundoff.svg";
      updateLocalSoundSrc("./assets/images/soundoff.svg");
    }
  });
}

export function playMusic(playable) {
  if (!playable) {
    themeAudio.pause();
    return;
  }
  themeAudio.currentTime = localStorage.getItem("soundTime") || 0;
  let themePromise = themeAudio.play();
  handleThemePromise(themePromise);
  themeAudio.loop = "true";
}

export function hoverMusic() {
  hoverAudio.currentTime = 0;
  hoverAudio.play();
}

export function clickMusic() {
  clickAudio.currentTime = 0;
  clickAudio.play();
}

export function checkPlayable() {
  return (getLocalSoundSrc() || soundToggle.src).includes("soundon")
    ? true
    : false;
}

export function gameAudioPlay(val){
  audioGame.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
  // audioGame[0].currentTime = 0;
  // audioGame[1].currentTime = 0;
  audioGame[val].play();
}
