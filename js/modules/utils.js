// Section Navigation
export const body = document.body;
// export const dummy = document.querySelector(".dummy");
export const settings = document.querySelector(".settings");
export const info = document.querySelector(".info");
export const infoIcon = document.querySelector(".header__info-icon");
export const creditMenu = document.querySelector(".footer__credit");
export const settingIcon = document.querySelector(".header__settings-icon");
export const levelMenu = document.querySelector(".footer__level");
export const popup = document.querySelector(".popup");
export const credits = document.querySelector(".credits");

export function settingsView() {
  if (nameEditIcon.src.includes("edit-save")) {
    nameEditIcon.click();
  }
  info.classList.add("none");
  credits.classList.add("none");
  if (body.classList.contains("not-home") && popup.classList.contains("none")) {
    body.classList.add("blur");
    settings.classList.toggle("none");
    check(1);
  } else {
    popup.classList.add("none");
    settings.classList.toggle("none");
    check(2);
  }
}

export function infoView() {
  settings.classList.add("none");
  credits.classList.add("none");
  if (body.classList.contains("not-home") && popup.classList.contains("none")) {
    body.classList.add("blur");
    info.classList.toggle("none");
    check(1);
  } else {
    popup.classList.add("none");
    info.classList.toggle("none");
    check(2);
  }
}

export function creditsView() {
  info.classList.add("none");
  settings.classList.add("none");
  if (body.classList.contains("not-home") && popup.classList.contains("none")) {
    body.classList.add("blur");
    credits.classList.toggle("none");
    check(1);
  } else {
    popup.classList.add("none");
    credits.classList.toggle("none");
    check(2);
  }
}

export function check(arg) {
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
export const nameEditIcon = document.querySelector(".settings__edit--icon");
export const nameInput = document.querySelector(".settings__input");
export const popupUsername = document.querySelector(".popup__username");
export const userChangeButton = document.querySelector(
  ".popup__button--change-user"
);

export function editName(editing) {
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
    settingsView();
  }
  return !editing;
}

export function positionCursor(end) {
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

export function setUserName(name) {
  localStorage.setItem("user", name);
}

export function getUserName() {
  return localStorage.getItem("user") || "Jaam";
}
