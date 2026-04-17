const board = document.getElementById("board");

const algSel = document.getElementById("alg-sel");
const randBtn = document.getElementById("rand-btn");
const playBtn = document.getElementById("play-btn");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = board.offsetWidth;
const canvasHeight = board.offsetHeight;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

algSel.addEventListener("change", (e) => {
  algSelected = e.target.value;
});

randBtn.addEventListener("click", () => {
  randomizeArr();
  draw();
});

playBtn.addEventListener("click", () => {
  play();
});

let arr = [];
let numberOfBars = 50;
let barGap = 2;
let barWidth = canvasWidth / numberOfBars - barGap;
let algSelected = "bubble-sort";

const barColor = "#3b3b3b";
const selectedBarColor = "#8a8a8a";
const biggerBarColor = "#246bb3";

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
  let barPos = barGap;
  for (let i = 0; i < arr.length; i++) {
    ctx.fillStyle = arr[i].color;
    ctx.fillRect(barPos, canvas.height - arr[i].val, barWidth, arr[i].val);
    barPos += barWidth + barGap;
  }
}

randomizeArr();
draw();

function play() {
  if (algSelected === "bubble-sort") {
    renderBubbleSort();
    return;
  }
  alert("alg not impl");
}

let msPerStep = 100;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function renderBubbleSort() {
  let steps = ["select-indexes", "select-bigger", "change", "walk"];
  let step = steps[0];

  let finish = false;

  let indexOne = 0;
  let indexTwo = 1;
  while (true) {
    if (finish) break;
    // impl finish func
    await sleep(msPerStep);

    if (step === "select-indexes") {
      arr[indexOne].color = selectedBarColor;
      arr[indexTwo].color = selectedBarColor;
      draw();
      step = "select-bigger";
      continue;
    }

    if (step === "select-bigger") {
      if (arr[indexOne].val >= arr[indexTwo]) {
        arr[indexOne].color = biggerBarColor;
      } else {
        arr[indexTwo].color = biggerBarColor;
      }
      draw();
      step = "change";
      continue;
    }

    if (step === "change") {
      if (arr[indexTwo].val <= arr[indexOne].val) {
        const aux = arr[indexOne];
        arr[indexOne] = arr[indexTwo];
        arr[indexTwo] = aux;
      }
      draw();
      step = "walk";
      continue;
    }

    if (step === "walk") {
      arr[indexOne].color = barColor;
      arr[indexTwo].color = barColor;
      draw();
      indexOne++;
      indexTwo++;
      if (indexTwo >= arr.length) {
        indexOne = 0;
        indexTwo = 1;
      }
      step = "select-indexes";
      continue;
    }
  }
}
