const themeAudio = document.querySelector(".audio__theme");
const hoverAudio = document.querySelector(".audio__hover");
const clickAudio = document.querySelector(".audio__click");
const options = document.querySelectorAll(".main__option");
const popupButton = document.querySelector(".popup__button");

function playMusic(){
    themeAudio.currentTime = 0;
    themeAudio.play();
    themeAudio.loop = "true";
}

function hoverMusic(){
    hoverAudio.currentTime = 0;
    hoverAudio.play();
}

function clickMusic(){
    clickAudio.currentTime = 0;
    clickAudio.play();
}

options.forEach(option => {
    option.addEventListener("mouseenter", hoverMusic);
    option.addEventListener("click", clickMusic);
});

popupButton.addEventListener("click", (e) => {
    document.body.classList.remove("blur");
    document.querySelector(".popup").classList.add("none");
    playMusic();
})

