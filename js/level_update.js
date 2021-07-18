const levelContainer = document.querySelector(".levels");
const goldenStar = `<img src="./assets/images/goldenstar.svg" alt="star" class="levels__star"/>`;
const silverStar = `<img src="./assets/images/silverstar.svg" alt="star" class="levels__star" />`;

let localValue = {
    1: ["played", 40, 100],
    2: ["played", 40, 100],
    3: ["played", 40, 80],
    4: ["played", 40, 70],
    5: ["played", 40, 60],
    6: ["current", null, null],
    7: ["locked", null, null],
    8: ["locked", null, null],
    9: ["locked", null, null],
    10: ["locked", null, null] 
};

function returnLevelStatus(val, levelCount){
    if(val == "played"){
        return `<img src="./assets/images/finished_level.svg" alt="asteroid" />
                <div class="levels__level">${levelCount}</div>`
    }
    return `<img src="./assets/images/nextLevel.svg" alt="asteroid" />
            <div class="levels__level"><img src="./assets/images/locked.svg" alt="" /></div>`
}

function returnStars(percentage){
    if(percentage == 100){
        return (goldenStar + "\n" + goldenStar + "\n" + goldenStar);
    }
    if(percentage >= 75){
        return (goldenStar + "\n" + goldenStar + "\n" + silverStar);
    }
    if(percentage >= 50){
        return (goldenStar + "\n" + silverStar + "\n" + silverStar);
    }
    return (silverStar + "\n" + silverStar + "\n" + silverStar);
}

function fillLevel(){
    let levelHTML = "";
    levelContainer.innerHTML = "";
    for(level in localValue){
        // console.log(level, localValue[level][2]);
        levelHTML += `<div class="levels__level-cnt">
                        <div class="levels__img-cnt">
                            ${returnLevelStatus(localValue[level][0], level)}
                        </div>
                        <div class="levels__star-cnt">
                            ${returnStars(localValue[level][2])}
                        </div>
                    </div>`;
    }
    return levelHTML;
}

levelContainer.innerHTML = fillLevel();




{/* <div class="levels__level-cnt">
<div class="levels__img-cnt">
  <img src="./assets/images/finished_level.svg" alt="asteroid" />
  <div class="levels__level">1</div>
</div>
<div class="levels__star-cnt">
  <img
    src="./assets/images/goldenstar.svg"
    alt="star"
    class="levels__star"
  />
  <img
    src="./assets/images/goldenstar.svg"
    alt="star"
    class="levels__star"
  />
  <img
    src="./assets/images/goldenstar.svg"
    alt="star"
    class="levels__star"
  />
</div>
</div> */}