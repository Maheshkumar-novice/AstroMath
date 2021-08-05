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

const header = document.querySelector("header");
const result = document.querySelector(".result");
const options = document.querySelectorAll("button");
const questions = document.querySelectorAll(".main__question");
const operators = ["+", "-", "*"];
const item = document.querySelectorAll(".main__item");
const itemRight = document.querySelector(".main__item--right");
const itemLeft = document.querySelector(".main__item--left");
const start = document.querySelector(".popup__button--start");
const score = document.querySelector(".header__info--score");
const quote = document.querySelector(".result__quotes");
const highImg = document.querySelector(".result__high-score");
const resultImg = document.querySelector(".result__img");
const pyro = document.querySelector(".pyro");
let highScore = document.querySelector(".result__highscore");
let currentScore = document.querySelector(".result__score");
const lifeContainer = document.querySelector(".life");
const quotes = {
  positve: ["You Did it!", "You crushed your high score!", "AHHHH Improved!"],
  negative: [
    "OOOPS! You didn't make it.",
    "No worries! Try again.",
    "Don't lose hope, you can!",
  ],
  nothin: ["Yep! Same level"],
};
let timeUp = false;
let correctAnswer = undefined;
let timeOut;
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
  timeOut = setTimeout(() => {
    item[0].removeAttribute("id");
    item[1].removeAttribute("id");
    populate();
    if (!timeUp) {
      addListeners();
    }
  }, 300);
}

let bonusStreak = 0;
// updateLocal("bonusStreak", bonusStreak);
function streakHelper(wrong = false) {
  console.log(bonusStreak);
  if (wrong) {
    bonusStreak = 0;
    return;
  }
  if (bonusStreak === 4 && lifeContainer.childElementCount < 6) {
    lifeContainer.innerHTML += `<img
    src="./assets/images/meteorlife.svg"
    alt="Life"
    class="life__img"
  />`;
    bonusStreak = 0;
  } else {
    bonusStreak = (bonusStreak + 1) % 5;
  }
}

function rightHelper() {
  streakHelper();
  correctBg();
  score.textContent = +score.textContent + 1;
}

function wrongHelper() {
  streakHelper(true);
  wrongBg();
  lifeContainer.lastElementChild.remove();
  if (lifeContainer.childElementCount === 0) {
    endGame();
  }
}

function right() {
  if (correctAnswer) {
    rightHelper();
  } else {
    wrongHelper();
  }
  update();
}

function wrong() {
  if (!correctAnswer) {
    rightHelper();
  } else {
    wrongHelper();
  }
  update();
}

function init(e) {
  if (e.key === "d" || e.target.dataset.side === "left") {
    right();
  } else if (e.key === "a" || e.target.dataset.side === "right") {
    wrong();
  }
}

let timerCheckTimeout;
function timerCheck() {
  if (secondsLeft < 0) {
    timeUp = true;
    clearTimeout(timeOut);
    endGame();
    clearTimeout(timerCheckTimeout);
    return;
  }
  timerCheckTimeout = setTimeout(timerCheck, 1000);
}

function updateScore() {
  let qono = Math.floor(Math.random() * 3);
  let high = +getLocal("bonusHighScore") || 0;
  let current = +score.textContent;
  highScore.innerHTML = `Previous High Score: <span class="secondary-color">${high}</span>`;
  currentScore.innerHTML = `Current Score: <span class="secondary-color">${current}</span>`;
  if (current > high) {
    quote.textContent = quotes.positve[qono];
    classWorker("none", "add", resultImg);
    classWorker("none", "remove", highImg, pyro);
  } else if (current < high) {
    quote.textContent = quotes.negative[qono];
  } else {
    quote.textContent = quotes.nothin[0];
  }
}

function endGame() {
  clearTime();
  removeListeners();
  updateScore();
  updateLocal("bonusHighScore", score.textContent);
  classWorker("none", "add", header, itemRight, itemLeft, lifeContainer);
  classWorker("none", "remove", result);
}

function navigate(e) {
  if (e.target.dataset.value === "again") {
    location.reload();
  } else if (e.target.dataset.value === "exit") {
    location.href = "./astro-math-levels.html";
  }
}

// event listeners
itemRight.addEventListener("click", init);
itemLeft.addEventListener("click", init);

options.forEach((option) => {
  option.addEventListener("click", navigate);
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
  timer(120);
  timerCheck();
  classWorker("none", "add", start.parentElement);
  populate();
});
