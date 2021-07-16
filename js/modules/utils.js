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

function addClass(elements, classValue) {
  elements.forEach((element) => {
    if (element) {
      element.classList.add(classValue);
    }
  });
}

function removeClass(elements, classValue) {
  elements.forEach((element) => {
    if (element) {
      element.classList.remove(classValue);
    }
  });
}

function toggleClass(elements, classValue) {
  elements.forEach((element) => {
    if (element) {
      element.classList.toggle(classValue);
    }
  });
}

function classWork(...args) {
  let classValue = args[0];
  let classOperation = args[1];
  let elements = args.slice(2, args.length);
  if (classOperation === "add") {
    addClass(elements, classValue);
  } else if (classOperation === "remove") {
    removeClass(elements, classValue);
  } else {
    toggleClass(elements, classValue);
  }
}

function containsClass(element, value) {
  if (element) {
    return element.classList.contains(value);
  }
  return false;
}

function nilCheck(element) {
  return element ? containsClass(element, "none") : true;
}

const viewWorkMap = {
  info: [settings, credits],
  settings: [info, credits],
  credits: [info, settings],
};

function viewWorker(view, strView) {
  let checkFlag;
  let otherTwo = viewWorkMap[strView];
  classWork("none", "add", otherTwo[0], otherTwo[1]);
  if (containsClass(body, "not-home") && nilCheck(popup)) {
    classWork("blur", "add", body);
    checkFlag = 1;
  } else {
    classWork("none", "add", popup);
    checkFlag = 2;
  }
  classWork("none", "toggle", view);
  check(checkFlag);
}

export function settingsView() {
  if (nameEditIcon.src.includes("edit-save")) {
    nameEditIcon.click();
  }
  viewWorker(settings, "settings");
}

export function infoView() {
  viewWorker(info, "info");
}

export function creditsView() {
  viewWorker(credits, "credits");
}

export function check(arg) {
  let menuItemsCheck =
    containsClass(info, "none") &&
    nilCheck(credits) &&
    containsClass(settings, "none");
  if (menuItemsCheck && containsClass(body, "blur") && arg === 1) {
    classWork("blur", "remove", body);
  } else if (menuItemsCheck && nilCheck(popup) && arg === 2) {
    popup ? classWork("none", "remove", popup) : console.log("no-pop-up-buddy");
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
    classWork("border-bottom", "add", nameInput);
    nameInput.removeAttribute("readonly");
    nameEditIcon.src = "./assets/images/edit-save.svg";
    positionCursor(nameInput);
  } else {
    classWork("border-bottom", "remove", nameInput);
    nameInput.setAttribute("readonly", true);
    nameEditIcon.src = "./assets/images/edit.svg";
    if (nameInput.value == "") {
      nameInput.value = "Jaam";
    }
    setUserName(nameInput.value);
    updatePopup(nameInput.value);
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

export function updatePopup(value) {
  popupUsername ? (popupUsername.textContent = value) : "no-pop-up-buddy";
}
