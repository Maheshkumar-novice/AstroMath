const body = document.body;
const settings = document.querySelector(".settings");
const info = document.querySelector(".info");
const infoIcon = document.querySelector(".header__info-icon");
const creditMenu = document.querySelector(".footer__credit");
const settingIcon = document.querySelector(".header__settings-icon");
const levelMenu = document.querySelector(".footer__level") || document.querySelector(".dummy");
const popup = 
  document.querySelector(".popup") || document.querySelector(".dummy");
const credits =
  document.querySelector(".credits") || document.querySelector(".dummy");

settingIcon.addEventListener("click", (e) => {
  info.classList.add("none");
  credits.classList.add("none");
  if (body.classList.contains("not-home") && popup.classList.contains("none")) {
    body.classList.remove("blur");
    body.classList.toggle("blur");
    settings.classList.toggle("none");
    check(1);
  } else {
    popup.classList.remove("none");
    popup.classList.toggle("none");
    settings.classList.toggle("none");
    check(2);
  }
});

infoIcon.addEventListener("click", (e) => {
  settings.classList.add("none");
  credits.classList.add("none");
  if (body.classList.contains("not-home") && popup.classList.contains("none")) {
    body.classList.remove("blur");
    body.classList.toggle("blur");
    info.classList.toggle("none");
    check(1);
  } else {
    popup.classList.remove("none");
    popup.classList.toggle("none");
    info.classList.toggle("none");
    check(2);
  }
});

if (!credits.classList.contains("dummy")) {
  creditMenu.addEventListener("click", (e) => {
    info.classList.add("none");
    settings.classList.add("none");
    if (
      body.classList.contains("not-home") &&
      popup.classList.contains("none")
    ) {
      body.classList.remove("blur");
      body.classList.toggle("blur");
      credits.classList.toggle("none");
      check(1);
    } else {
      popup.classList.remove("none");
      popup.classList.toggle("none");
      credits.classList.toggle("none");
      check(2);
    }
  });
}

function check(arg) {
  let a = info.classList.contains("none");
  let b = credits.classList.contains("none");
  let c = settings.classList.contains("none");
  let d = popup.classList.contains("none");
  let e = body.classList.contains("blur");
  let r = a && b && c && d;
  let r1 = a && b && c && e;
  if (arg == 2) {
    if (r) {
      popup.classList.remove("none");
    }
  } else {
    if (r1) {
      body.classList.remove("blur");
    }
  }
}

// let docStyle = document.documentElement.style;
// let heroText = document.querySelector('.popup__title').textContent;

// function updateHeroLength() {
//     docStyle.setProperty('--typewriterCharacters', heroText.length);
// }

// window.addEventListener('load', updateHeroLength);
