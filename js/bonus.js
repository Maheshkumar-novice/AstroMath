const questions = document.querySelectorAll(".main__question");
const operators = ["+", "-", "*"];
const item = document.querySelectorAll(".main__item");
let correctAnswer = undefined;
let comment = document.querySelector(".comment");
const itemRight = document.querySelector(".main__item:first-child");
const itemLeft = document.querySelector(".main__item:last-child");

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
    console.log("Date");
    addListeners();
  }, 1000);
}

function right() {
  if (correctAnswer) {
    correctBg();
  } else {
    wrongBg();
  }
  update();
}

function wrong() {
  if (!correctAnswer) {
    correctBg();
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

// event listeners
window.addEventListener("keyup", init);
itemRight.addEventListener("click", init);
itemLeft.addEventListener("click", init);

// start
populate();
