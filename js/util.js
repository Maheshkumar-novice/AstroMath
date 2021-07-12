const infoIc = document.querySelector(".header__info-icon");
const infoRtlIc = document.querySelector(".header__info-rtl-icon");
const infoCnt = document.querySelector(".header__icon:last-child");

infoCnt.addEventListener("mouseenter", (e) => {
  //<span class="iconify" data-icon="fluent:book-question-mark-rtl-24-filled" data-inline="false"></span>
});

const body = document.body;
const popup = document.querySelector(".popup");
const settings = document.querySelector(".settings");
const info = document.querySelector(".info");
const infoIcon = document.querySelector(".header__title");
const settingIcon = document.querySelector(".header__settings-icon");
const creditMenu = document.querySelector(".footer__credit");
const credits = document.querySelector(".credits");

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

creditMenu.addEventListener("click", (e) => {
  info.classList.add("none");
  settings.classList.add("none");
  if (body.classList.contains("not-home") && popup.classList.contains("none")) {
    body.classList.remove("blur");
    body.classList.toggle("blur");
    credits.classList.toggle("none");
    check(1)
  } else {
    popup.classList.remove("none");
    popup.classList.toggle("none");
    credits.classList.toggle("none");
    check(2);
  }
});

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
  }
  else {
    if (r1) {
        body.classList.remove("blur");
      }
  }
  
}
