import { getLocal, updateLocal } from "./modules/utils.js";

// display levels
const levelContainer = document.querySelector(".levels");
const goldenStar = `<img src="./assets/images/goldenstar.svg" alt="star" class="levels__star"/>`;
const silverStar = `<img src="./assets/images/silverstar.svg" alt="star" class="levels__star" />`;

let newLevel = JSON.stringify({
  1: ["current", null, null, 5],
  2: ["locked", null, null, 6],
  3: ["locked", null, null, 7],
  4: ["locked", null, null, 8],
  5: ["locked", null, null, 9],
  6: ["locked", null, null, 10],
  7: ["locked", null, null, 11],
  8: ["locked", null, null, 12],
  9: ["locked", null, null, 15],
  10: ["locked", null, null, 15],
})

let levelValueBak = {
  1: ["played", 40, 100, 5],
  2: ["played", 40, 100, 6],
  3: ["played", 40, 80, 7],
  4: ["played", 40, 70, 8],
  5: ["played", 40, 60, 9],
  6: ["current", null, null, 10],
  7: ["locked", null, null, 11],
  8: ["locked", null, null, 12],
  9: ["locked", null, null, 15],
  10: ["locked", null, null, 15],
};
// updateLocal("levelValue", JSON.stringify(levelValueBak));


function returnLevelStatus(status, level) {
  if (status === "played") {
    return `<img src="./assets/images/finished_level.svg" alt="asteroid" />
                <div class="levels__level">${level}</div>`;
  } else if (status === "locked") {
    return `<img src="./assets/images/nextLevel.svg" alt="asteroid" />
            <div class="levels__level"><img src="./assets/images/locked.svg" alt="" /></div>`;
  } else {
    return `<img src="./assets/images/nextLevel.svg" alt="asteroid" />
            <div class="levels__level">${level}</div>`;
  }
}

function returnStars(percentage) {
  if (percentage == 100) {
    return goldenStar + goldenStar + goldenStar;
  }
  if (percentage >= 75) {
    return goldenStar + goldenStar + silverStar;
  }
  if (percentage >= 50) {
    return goldenStar + silverStar + silverStar;
  }
  return silverStar + silverStar + silverStar;
}

function fillLevel() {
  let levelHTML = "";
  levelContainer.innerHTML = "";
  for (let level in levelValue) {
    levelHTML += `<div class="levels__level-cnt" data-level="${level}" data-per="${
      levelValue[level][2]
    }" data-status="${levelValue[level][0]}" data-questions="${
      levelValue[level][3]
    }" data-besttime="${levelValue[level][1]}">
                        <div class="levels__img-cnt">
                            ${returnLevelStatus(levelValue[level][0], level)}
                        </div>
                        <div class="levels__star-cnt">
                            ${returnStars(levelValue[level][2])}
                        </div>
                    </div>`;
  }
  return levelHTML;
}

function updateNewGame(){
  updateLocal("levelValue", newLevel);
  updateLocal("currentLevel", "1");
  return newLevel
}

let levelValue;
async function parseLevel() {
  levelValue = JSON.parse(getLocal("levelValue") || updateNewGame());
}

async function updateData() {
  await parseLevel();
  levelContainer.innerHTML = fillLevel();
  clickLevel();
}

updateData();

// set data for game page
function getLevelTime(level) {
  console.log(level);
  if (level == 1) {
    return 45;
  } else if (level <= 4) {
    return 43;
  } else if (level <= 8) {
    return 40;
  } else if (level <= 10) {
    return 35;
  }
}

let clickedLevel,
  clickedGameTime,
  clickedGameBestTime,
  clickedLevelPercentage,
  clickedLevelQuestions;
function clickLevel() {
  const levels = document.querySelectorAll(".levels__level-cnt");
  levels.forEach((level) => {
    level.addEventListener("click", () => {
      if (level.dataset.status !== "locked") {
        clickedLevel = level.dataset.level;
        clickedGameTime = getLevelTime(clickedLevel);
        clickedGameBestTime = level.dataset.besttime;
        clickedLevelPercentage = level.dataset.per;
        clickedLevelQuestions = level.dataset.questions;
        updateLocal("gameTime", clickedGameTime);
        updateLocal("gameBestTime", clickedGameBestTime);
        updateLocal("gameLevel", clickedLevel);
        updateLocal("gamePercentage", clickedLevelPercentage);
        updateLocal("gameQuestions", clickedLevelQuestions);
        location.href = "./astro-math.html";
      }
    });
  });
}
