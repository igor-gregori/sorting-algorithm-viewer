const board = document.getElementById("board");

const randBtn = document.getElementById("rand-btn");
const playBtn = document.getElementById("play-btn");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = board.offsetWidth;
const canvasHeight = board.offsetHeight;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

randBtn.addEventListener("click", () => {
  randomizeArr();
  draw();
});

playBtn.addEventListener("click", () => {
  alert("play");
});

let arr = [];
let numberOfBars = 50;
let barGap = 2;
let barWidth = canvasWidth / numberOfBars - barGap;

function randomizeArr() {
  arr = [];
  for (let i = 0; i < numberOfBars; i++) {
    arr.push(Math.floor(Math.random() * canvasHeight * 0.75));
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  let barPos = barGap;
  for (let i = 0; i < arr.length; i++) {
    ctx.fillStyle = "#3b3b3b";
    ctx.fillRect(barPos, canvas.height - arr[i], barWidth, arr[i]);
    barPos += barWidth + barGap;
  }
}

randomizeArr();
draw();
