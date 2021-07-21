import {
  getLocal,
  updateLocal,
  secondsLeft,
  timer,
  classWorker,
} from "./modules/utils.js";

const operators = ["+", "-", "*", "/"];
let qaMap = {};
let randomAnswer1,
  randomAnswer2,
  score = 0;
let answers = [];

function getRandomOperator() {
  return operators[Math.floor(Math.random() * operators.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10 + 1);
}

function getRandomAnswers(ans) {
  randomAnswer1 = getRandomNumber();
  randomAnswer2 = getRandomNumber();
  if (
    randomAnswer1 === ans ||
    randomAnswer2 === ans ||
    randomAnswer1 === randomAnswer2 ||
    answers.includes(randomAnswer1) ||
    answers.includes(randomAnswer2)
  ) {
    return getRandomAnswers(ans);
  } else {
    return [randomAnswer1, randomAnswer2];
  }
}

function generateRandomChoices(qaMap) {
  for (let val in qaMap) {
    let randomAnswers = getRandomAnswers(qaMap[val]);
    qaMap[val] = [qaMap[val], randomAnswers[0], randomAnswers[1]];
  }
}

function returnAnswer(op1, op2, op) {
  switch (op) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      return +(op1 / op2).toFixed(2);
    case "^":
      return Math.pow(op1, op2);
  }
}

function checkEquation(eq) {
  return eq in qaMap;
}

function generateProblem() {
  let [op1, op2, op] = [
    getRandomNumber(),
    getRandomNumber(),
    getRandomOperator(),
  ];
  let eq = `${op1} ${op} ${op2}`;
  while (checkEquation(eq)) {
    [op1, op2, op] = [
      getRandomNumber(),
      getRandomNumber(),
      getRandomOperator(),
    ];
    eq = `${op1} ${op} ${op2}`;
  }
  let ans = returnAnswer(op1, op2, op);
  while (answers.includes(ans)) {
    [op1, op2, op] = [
      getRandomNumber(),
      getRandomNumber(),
      getRandomOperator(),
    ];
    eq = `${op1} ${op} ${op2}`;
    ans = returnAnswer(op1, op2, op);
  }
  answers.push(ans);
  qaMap[eq] = ans;
}

function generateQA() {
  let questions = getLocal("gameQuestions");
  for (let i = 0; i < questions; i++) {
    generateProblem();
  }
  generateRandomChoices(qaMap);
}

generateQA();
console.table(qaMap);

// asteroids
let asteroids_container = document.querySelector(".main__asteroids");
let asteroid_containers = document.querySelectorAll(
  ".main__asteroid-containerr"
);
let asteroids = "";
let eqAnswer;
let gameOptions = document.querySelectorAll(".footer__option");

asteroid_containers.forEach((container) => {
  container.remove();
});

for (let q in qaMap) {
  eqAnswer = qaMap[q][0];
  asteroids += `<div class="main__asteroid-container" data-ans="${eqAnswer}" data-all="${qaMap[q]}">
  <h2 class="main__asteroid-problem">${q}</h2>
  <img src="./assets/images/asteroid.png" alt="" class="main__asteroid" />
</div>`;
}
asteroids_container.innerHTML = asteroids;
let gameAsteroids = [...document.querySelectorAll(".main__asteroid-container")];

// options
function randIndex(index) {
  return Math.floor(Math.random() * index);
}

let randomAsteroid;
const scoreTag = document.querySelector(".header__info--score");

function assignOptions() {
  randomAsteroid = gameAsteroids.splice(randIndex(gameAsteroids.length), 1)[0];
  console.log(randomAsteroid);
  if (!randomAsteroid) {
    endGame();
    return;
  }
  let values = randomAsteroid.dataset.all.split(",");
  let done = [];
  values.forEach((e) => {
    let ri = randIndex(3);
    while (done.includes(ri)) {
      ri = randIndex(3);
    }
    done.push(ri);
    gameOptions[ri].textContent = e;
    gameOptions[ri].dataset.value = e;
  });
}

window.addEventListener("load", assignOptions);

const keys = {
  a: gameOptions[0],
  s: gameOptions[1],
  d: gameOptions[2],
  1: gameOptions[0],
  2: gameOptions[1],
  3: gameOptions[2],
};

function answerValidate(value) {
  let target = document.querySelector(`[data-ans="${value}"]`);
  if (target) {
    target.remove();
    scoreTag.innerText = ++score;
  } else {
    randomAsteroid.querySelector("h2").style.color = "red";
  }
  assignOptions();
}

gameOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    answerValidate(e.target.textContent.trim());
  });
});


function calculatePercentage(ques, score) {
  return (score / ques) * 100;
}

const footer = document.querySelector(".footer");

function endGame() {
  let localjson = JSON.parse(getLocal("levelValue"));

  let currTime = +getLocal("gameTime") - (secondsLeft < 0 ? 0 : secondsLeft);
  let ques = getLocal("gameQuestions");
  let currPercentage = Math.floor(
    calculatePercentage(ques, +scoreTag.innerText)
  );
  let currBestTime = +getLocal("gameBestTime") || 0;
  console.log(currBestTime);
  let previousPercentage = getLocal("gamePercentage");
  
  let currLevel = `${getLocal("gameLevel")}`;

  if (localjson[currLevel][0] === "current" && currPercentage >= 50) {
    localjson[currLevel][2] = currPercentage;
    localjson[currLevel][0] = "played";
    let next = `${+currLevel + 1}`;
    localjson[next][0] = "current";
    localjson[currLevel][1] = currTime;
  }
  else if (currPercentage > previousPercentage) {
    localjson[currLevel][2] = currPercentage;
    localjson[currLevel][1] = currTime;
  }
  if(currPercentage == previousPercentage && currTime <= currBestTime ){
    localjson[currLevel][1] = currTime;
  }

  updateLocal("gamePercentage", localjson[currLevel][2]);
  updateLocal("gameBestTime", localjson[currLevel][1]);
  updateLocal("levelValue", JSON.stringify(localjson));
  asteroids_container.style.display = footer.style.display = "none";
}

function timerCheck() {
  if (secondsLeft < 0) {
    endGame();
    return;
  }
  setTimeout(timerCheck, 1000);
}

const start = document.querySelector(".popup__button--start");
start.addEventListener("click", () => {
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "a":
      case "s":
      case "d":
        answerValidate(keys[e.key].textContent.trim());
    }
  });
  footer.style.pointerEvents = "unset";
  timer(getLocal("gameTime"));
  timerCheck();
  classWorker("none", "add", start.parentElement);
});

footer.style.pointerEvents = "none";

// setInterval(function (){
//   console.log(secondsLeft);
// }, 800);
