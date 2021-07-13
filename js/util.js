// Section Navigation
const body = document.body;
const dummy = document.querySelector(".dummy");
const settings = document.querySelector(".settings");
const info = document.querySelector(".info");
const infoIcon = document.querySelector(".header__info-icon");
const creditMenu = document.querySelector(".footer__credit");
const settingIcon = document.querySelector(".header__settings-icon");
const levelMenu = document.querySelector(".footer__level") || dummy;
const popup = document.querySelector(".popup") || dummy;
const credits = document.querySelector(".credits") || dummy;

settingIcon.addEventListener("click", settingsView);
infoIcon.addEventListener("click", infoView);
if (!credits.classList.contains("dummy")) {
  creditMenu.addEventListener("click", creditsView);
}

function settingsView() {
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
}

function infoView() {
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
}

function creditsView() {
  info.classList.add("none");
  settings.classList.add("none");
  if (body.classList.contains("not-home") && popup.classList.contains("none")) {
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

// Settings of UserName
const nameEditIcon = document.querySelector(".settings__edit-icon") || dummy;
const nameInput = document.querySelector(".settings__input") || dummy;
const popupUsername = document.querySelector(".popup__username") || dummy;
const userChangeButton = document.querySelector(".popup__button--change-user");
let editing = true;

nameEditIcon.addEventListener("click", (e) => {
  if (editing) {
    nameInput.classList.add("border-bottom");
    nameInput.removeAttribute("readonly");
    nameEditIcon.src = "./assets/images/edit-save.svg";
    positionCursor(nameInput);
  } else {
    nameInput.classList.remove("border-bottom");
    nameInput.setAttribute("readonly", true);
    nameEditIcon.src = "./assets/images/edit.svg";
    if (nameInput.value == "") {
      nameInput.value = "Jaam";
    }
    setUserName(nameInput.value);
    popupUsername.textContent = nameInput.value;
        // positionCursor(nameInput);
  }
  editing = !editing;
});

function positionCursor(end) {
  let len = end.value.length;
  if (end.setSelectionRange) {
    end.focus();
    end.setSelectionRange(len, len);
  } else if (end.createTextRange) {
    var t = end.createTextRange();
    t.collapse(true);
    t.moveEnd("character", len);
    t.moveStart("character", len);
    t.select();
  }
}

function setUserName(name) {
  localStorage.setItem("user", name);
}

function getUserName() {
  return localStorage.getItem("user") || "Jaam";
}

userChangeButton.addEventListener("click", (e) => {
  settingsView();
  nameEditIcon.click();
});

window.addEventListener("load", (e) => {
  nameInput.value = getUserName();
  popupUsername.textContent = nameInput.value;
});
