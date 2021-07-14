const options = [...document.querySelectorAll(".footer__option")];
const colorMap = {
  invertedColor: "var(--primary-color)",
  invertedBackground: "var(--secondary-color)",
  normalColor: "var(--secondary-color)",
  normalBackground: "var(--primary-color)",
};
const keys = {
  a: options[0],
  s: options[1],
  d: options[2],
  1: options[0],
  2: options[1],
  3: options[2],
};

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    triggerOption(option.dataset.option);
  });
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
    case "s":
    case "d":
      triggerOption(e.key);
  }
});

function triggerOption(key) {
  invertColor(keys[key]);
  setTimeout(() => {
    normaliseColor(keys[key]);
  }, 200);
}

function invertColor(key) {
  key.style.color = colorMap.invertedColor;
  key.style.background = colorMap.invertedBackground;
  key.style.boxShadow = "2px 3px black";
  //   key.style.transform = "scale(1.2)";
}

function normaliseColor(key) {
  key.style.color = colorMap.normalColor;
  key.style.background = colorMap.normalBackground;
  key.style.boxShadow = "5px 5px black";
  //   key.style.transform = "scale(1)";
}

// Timer
const timeHolder = document.querySelector(".header__info--time");
let countdown;
function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  if (seconds < 10) {
    // timeHolder.style.color = "var(--danger-color)";
  }
  const display = seconds + " s";
  document.title = display;
  timeHolder.textContent = display;
  if (seconds == 0) {
    timeHolder.textContent = "0 s";
  }
}

// function startTimer() {
//   let time = "20";
//   const seconds = time;
//   timer(seconds);
// }

// startTimer();
timer("20");