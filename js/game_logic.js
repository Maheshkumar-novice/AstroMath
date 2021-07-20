import { getLocal, updateLocal } from "./modules/utils.js";

let currentLevelData;
window.addEventListener("load", () => {
  currentLevelData = JSON.parse(getLocal("levelValue"));
  currentLevelData[getLocal("gameLevel")][1] = 5;
  updateLocal("levelValue", JSON.stringify(currentLevelData));
});
