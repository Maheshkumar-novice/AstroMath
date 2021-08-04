import { soundToggle, playMusic, checkPlayable } from "./modules/music.js";
import {
  body,
  getLocal,
  updateLocal,
  containsClass,
  secondsLeft,
  timer,
  classWorker,
  clearTime,
} from "./modules/utils.js";

const questions = document.querySelectorAll(".main__question");
const operators = ["+", "-", "*"];
const item = document.querySelectorAll(".main__item");
const itemRight = document.querySelector(".main__item--right");
const itemLeft = document.querySelector(".main__item--left");
const start = document.querySelector(".popup__button--start");
const score = document.querySelector(".header__info--score");
let correctAnswer = undefined;
let soundSrc;
let playable;
itemRight.style.pointerEvents = "none";
itemLeft.style.pointerEvents = "none";

function getRandomOperator() {
  return operators[Math.floor(Math.random() * operators.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10 + 1);
}

function returnAnswer(op1, op2, op) {
  switch (op) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
  }
}

function getItems() {
  return [getRandomNumber(), getRandomNumber(), getRandomOperator()];
}

function generateCorrectProblem() {
  let [op1, op2, op] = getItems();
  let eq1 = `${op1} ${op} ${op2}`;
  let ans1 = returnAnswer(op1, op2, op);

  [op1, op2, op] = getItems();
  let eq2 = `${op1} ${op} ${op2}`;
  let ans2 = returnAnswer(op1, op2, op);

  while (ans1 !== ans2 || eq1 === eq2) {
    [op1, op2, op] = getItems();
    eq2 = `${op1} ${op} ${op2}`;
    ans2 = returnAnswer(op1, op2, op);
  }
  return [eq1, eq2, true];
}

function generateRandomProblem() {
  let [op1, op2, op] = getItems();
  let eq1 = `${op1} ${op} ${op2}`;
  let ans1 = returnAnswer(op1, op2, op);

  [op1, op2, op] = getItems();
  let eq2 = `${op1} ${op} ${op2}`;
  let ans2 = returnAnswer(op1, op2, op);

  while (ans1 === ans2 || eq1 === eq2) {
    [op1, op2, op] = getItems();
    eq2 = `${op1} ${op} ${op2}`;
    ans2 = returnAnswer(op1, op2, op);
  }
  return [eq1, eq2, false];
}

function randomRandomProblem() {
  let random = getRandomNumber();
  if (random % 2) {
    return generateRandomProblem();
  } else {
    return generateCorrectProblem();
  }
}

function populate() {
  let items = randomRandomProblem();
  correctAnswer = items[2];
  questions[0].textContent = items[0];
  questions[1].textContent = items[1];
}

function wrongBg() {
  item[0].setAttribute("id", "bg-wrong");
  item[1].setAttribute("id", "bg-wrong");
}

function correctBg() {
  item[0].setAttribute("id", "bg-correct");
  item[1].setAttribute("id", "bg-correct");
}

function removeListeners() {
  window.removeEventListener("keyup", init);
  itemRight.removeEventListener("click", init);
  itemLeft.removeEventListener("click", init);
}

function addListeners() {
  window.addEventListener("keyup", init);
  itemRight.addEventListener("click", init);
  itemLeft.addEventListener("click", init);
}

function update() {
  removeListeners();
  setTimeout(() => {
    item[0].removeAttribute("id");
    item[1].removeAttribute("id");
    populate();
    addListeners();
  }, 500);
}

function right() {
  if (correctAnswer) {
    correctBg();
    score.textContent = +score.textContent + 1;
  } else {
    wrongBg();
  }
  update();
}

function wrong() {
  if (!correctAnswer) {
    correctBg();
    score.textContent = +score.textContent + 1;
  } else {
    wrongBg();
  }
  update();
}

function init(e) {
  if (e.key === "ArrowRight" || e.target.dataset.side === "left") {
    right();
  } else if (e.key === "ArrowLeft" || e.target.dataset.side === "right") {
    wrong();
  }
}

function timerCheck() {
  if (secondsLeft < 0) {
    endGame();
    return;
  }
  setTimeout(timerCheck, 1000);
}

function endGame() {
  clearTime();
  removeListeners();
}

// event listeners
itemRight.addEventListener("click", init);
itemLeft.addEventListener("click", init);
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
  playMusic(playable);
});
window.onload = function () {
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
  localStorage.removeItem("soundTime");
};
start.addEventListener("click", () => {
  window.addEventListener("keyup", init);
  itemRight.style.pointerEvents = "unset";
  itemLeft.style.pointerEvents = "unset";
  timer(5);
  timerCheck();
  classWorker("none", "add", start.parentElement);
});

// start
populate();
