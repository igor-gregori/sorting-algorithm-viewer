const board = document.getElementById("board");

const algorithmSelector = document.getElementById("algorithm-selector");
const numberBarsInput = document.getElementById("number-bars-input");
const stepsPerSecondInput = document.getElementById("steps-per-second-input");

const randBtn = document.getElementById("rand-btn");
const playBtn = document.getElementById("play-btn");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
  if (!Number.isNaN(value) && value >= 5 && value <= 300) {
    stopAnimation();
    numberOfBars = value;
    randomizeArr();
    draw();
  }
});

stepsPerSecondInput.addEventListener("change", (e) => {
  const value = Number(e.target.value);
  if (!Number.isNaN(value) && value >= 1 && value <= 3000) {
    stepsPerSecond = value;
    stepInterval = 1000 / stepsPerSecond;
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
let numberOfBars = 30;
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
      let aux;
      if (arr[j].val < arr[i].val) {
        aux = arr[i];
        arr[i] = arr[j];
        arr[j] = aux;
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

function createInsertionSortState() {
  return {
    step: "select-main-index",
    i: 1,
    j: 0,
    changeWith: null,
  };
}

function insertionSortStep(state) {
  if (state.i >= arr.length) {
    for (let k = 0; k < arr.length; k++) {
      arr[k].color = finishBarColor;
    }
    state.done = true;
    return;
  }

  let { step, i, j, changeWith } = state;

  switch (step) {
    case "select-main-index":
      arr[i].color = selectedBarColor;
      state.step = "select-aux-index";
      break;
    case "select-aux-index":
      arr[j].color = selectedBarColor;
      state.step = "select-bigger";
      break;
    case "select-bigger":
      if (arr[i].val > arr[j].val) {
        arr[i].color = biggerBarColor;
        if (changeWith !== null) {
          state.step = "change";
          break;
        }
        state.step = "walk-main";
      } else {
        state.changeWith = j;
        arr[j].color = biggerBarColor;
        state.step = "walk-aux";
      }
      break;
    case "walk-aux":
      arr[j].color = barColor;
      if (j === 0 && state.changeWith !== null) {
        state.step = "change";
        break;
      }
      if (j === 0) {
        state.step = "walk-main";
        break;
      }
      state.j--;
      state.step = "select-aux-index";
      break;
    case "walk-main":
      arr[i].color = barColor;
      arr[j].color = barColor;
      state.i++;
      state.j = state.i - 1;
      state.step = "select-main-index";
      break;
    case "change":
      arr[i].color = barColor;
      arr[j].color = barColor;
      let aux;
      for (let k = i; k > state.changeWith; k--) {
        aux = arr[k];
        arr[k] = arr[k - 1];
        arr[k - 1] = aux;
      }
      state.step = "walk-main";
      state.changeWith = null;
      break;
  }
}

let stepsPerSecond = 3;
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
    Number.isNaN(numberBarsInputValue) ||
    numberBarsInputValue < 5 ||
    numberBarsInputValue > 300
  ) {
    alert("'Number os bars' must be a number between 5 and 300");
    return;
  }

  const stepsPerSecondValue = Number(stepsPerSecondInput.value);
  if (
    Number.isNaN(stepsPerSecondValue) ||
    stepsPerSecondValue < 1 ||
    stepsPerSecondValue > 3000
  ) {
    alert("'Steps per second' must be a number between 1 and 3000");
    return;
  }

  numberOfBars = numberBarsInput.value;

  stepsPerSecond = stepsPerSecondValue;
  stepInterval = 1000 / stepsPerSecond;

  if (algSelected === "bubble-sort") {
    const state = createBubbleSortState();
    runAnimation(bubbleSortStep, state);
    return;
  }

  if (algSelected === "insertion-sort") {
    const state = createInsertionSortState();
    runAnimation(insertionSortStep, state);
    return;
  }

  // implement quick sort

  alert("alg not impl");
}
