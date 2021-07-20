import { getLocal, updateLocal } from "./modules/utils.js";

const operators = ["+", "-", "*", "/"];
let qaMap = {};

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
  let eq = op1 + op + op2;
  while (checkEquation(eq)) {
    [op1, op2, op] = [
      getRandomNumber(),
      getRandomNumber(),
      getRandomOperator(),
    ];
    eq = op1 + op + op2;
  }
  let ans = returnAnswer(op1, op2, op);
  qaMap[eq] = [ans, ans + 10, ans - 10];
}

generateProblem();
