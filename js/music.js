const themeAudio = document.querySelector(".audio__theme");
const hoverAudio = document.querySelector(".audio__hover");
const clickAudio = document.querySelector(".audio__click");
const options = document.querySelectorAll(".main__option");
const popupButton = document.querySelector(".popup__button") || document.querySelector(".dummy");   
const soundToggle = document.querySelector(".settings__sound--icon");
let soundSrc, playable;

function updateLocalSoundSrc(src){
    localStorage.setItem("currentSoundSrc", src);
}

function getLocalSoundSrc(){
    return localStorage.getItem("currentSoundSrc");
}

function handleThemePromise(promise){
    promise
    .catch(err =>{
        if(err){
            soundToggle.src = "./assets/images/soundoff.svg";
            updateLocalSoundSrc("./assets/images/soundoff.svg");
        }
    });
}

function playMusic(){
    if(!playable)
    {
        themeAudio.pause();
        return;
    }
    themeAudio.currentTime = 0;
    let themePromise = themeAudio.play();
    handleThemePromise(themePromise);
    themeAudio.loop = "true";
}

function hoverMusic(){
    if(!playable) return;
    hoverAudio.currentTime = 0;
    hoverAudio.play();
}

function clickMusic(){
    if(!playable) return;
    clickAudio.currentTime = 0;
    clickAudio.play();
}

function checkPlayable(){
    soundSrc = getLocalSoundSrc() || soundToggle.src;
    return soundSrc.includes("soundon") ? true : false; 
}

options.forEach(option => {
    option.addEventListener("mouseenter", hoverMusic);
    option.addEventListener("click", clickMusic);
});

popupButton.addEventListener("click", (e) => {
    document.body.classList.remove("blur");
    document.body.classList.add("not-home");
    popup.classList.remove("popup__active");
    popup.classList.add("none");
    if(checkPlayable()){
        playMusic();
    }
});

levelMenu.addEventListener("click", (e) => {
    updateLocalSoundSrc(soundToggle.src);
});

soundToggle.addEventListener("click", (e) => {
    soundSrc = soundToggle.src;
    if(soundSrc.includes("soundon")){
        soundToggle.src = "./assets/images/soundoff.svg";
        updateLocalSoundSrc("./assets/images/soundoff.svg");
        playable = false;
    }
    else{
        soundToggle.src = "./assets/images/soundon.svg";
        updateLocalSoundSrc("./assets/images/soundon.svg");
        playable = true;
    }
    console.log(popup.classList.contains("none"));
    popup.classList.contains("popup__active") ? console.log("hello") : playMusic();
});

window.onload = function(){
    if(document.body.classList.contains("not-home")){
        soundToggle.src = getLocalSoundSrc() || soundToggle.src;
        if(checkPlayable()){
            playable = true;
        }
        playMusic();
    }
    else{
        getLocalSoundSrc() ? (soundToggle.src = getLocalSoundSrc(), playable = checkPlayable()) : (updateLocalSoundSrc(soundToggle.src), playable=true);
        
    }
};