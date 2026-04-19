const board = document.getElementById("board");

const algorithmSelector = document.getElementById("algorithm-selector");
const numberBarsInput = document.getElementById("number-bars-input");

const randBtn = document.getElementById("rand-btn");
const playBtn = document.getElementById("play-btn");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// todo: steps per seconds input
// todo: number of bars input

let canvasWidth = board.offsetWidth;
let canvasHeight = board.offsetHeight;

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

algorithmSelector.addEventListener("change", (e) => {
  stopAnimation();
  algSelected = e.target.value;
});

numberBarsInput.addEventListener("change", (e) => {
  const value = Number(e.target.value);
  if (value !== NaN && value >= 5 && value <= 100) {
    stopAnimation();
    numberOfBars = value;
    randomizeArr();
    draw();
  }
});

randBtn.addEventListener("click", () => {
  stopAnimation();
  randomizeArr();
  draw();
});

playBtn.addEventListener("click", () => {
  play();
});

let arr = [];
let numberOfBars = 25;
let barGap = 2;
let algSelected = "bubble-sort";

const barColor = "#3b3b3b";
const selectedBarColor = "#8a8a8a";
const biggerBarColor = "#246bb3";
const finishBarColor = "#6f8a6f";

function randomizeArr() {
  arr = [];
  for (let i = 0; i < numberOfBars; i++) {
    arr.push({
      val: Math.floor(Math.random() * canvasHeight * 0.75),
      color: barColor,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const barWidth = canvasWidth / numberOfBars - barGap;
  let barPos = barGap;
  for (let i = 0; i < arr.length; i++) {
    ctx.fillStyle = arr[i].color;
    ctx.fillRect(barPos, canvas.height - arr[i].val, barWidth, arr[i].val);
    barPos += barWidth + barGap;
  }
}

randomizeArr();
draw();

let animationId = null;

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function createBubbleSortState() {
  return {
    step: "select-indexes",
    changes: 0,
    i: 0,
    j: 1,
    done: false,
  };
}

function bubbleSortStep(state) {
  if (state.done) return;

  let { step, i, j } = state;

  switch (step) {
    case "select-indexes":
      arr[i].color = selectedBarColor;
      arr[j].color = selectedBarColor;
      state.step = "select-bigger";
      break;
    case "select-bigger":
      if (arr[i].val >= arr[j].val) {
        arr[i].color = biggerBarColor;
      } else {
        arr[j].color = biggerBarColor;
      }
      state.step = "change";
      break;
    case "change":
      if (arr[j].val < arr[i].val) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        state.changes++;
      }
      state.step = "walk";
      break;
    case "walk":
      arr[i].color = barColor;
      arr[j].color = barColor;
      state.i++;
      state.j++;
      if (state.j >= arr.length) {
        state.i = 0;
        state.j = 1;
        if (state.changes === 0) {
          for (let k = 0; k < arr.length; k++) {
            arr[k].color = finishBarColor;
          }
          state.done = true;
          return;
        }
        state.changes = 0;
      }
      state.step = "select-indexes";
      break;
  }
}

let stepsPerSecond = 100;
let stepInterval = 1000 / stepsPerSecond;

function runAnimation(stepFn, state) {
  let lastTime = performance.now();
  let accumulator = 0;
  function frame(currentTime) {
    const delta = currentTime - lastTime;
    lastTime = currentTime;
    accumulator += delta;
    while (accumulator >= stepInterval) {
      stepFn(state);
      accumulator -= stepInterval;
      if (state.done) break;
    }
    draw();
    if (!state.done) {
      animationId = requestAnimationFrame(frame);
    }
  }
  animationId = requestAnimationFrame(frame);
}

function play() {
  stopAnimation();

  const numberBarsInputValue = Number(numberBarsInput.value);
  if (
    numberBarsInputValue === NaN ||
    numberBarsInputValue < 5 ||
    numberBarsInputValue > 100
  ) {
    alert("Number os bars must be  5 > x < 100");
    numberOfBars = 25;
    numberBarsInput.value = 25;
    randomizeArr();
    draw();
  }

  numberOfBars = numberBarsInput.value;

  if (algSelected === "bubble-sort") {
    const state = createBubbleSortState();
    runAnimation(bubbleSortStep, state);
    return;
  }

  alert("alg not impl");
}
