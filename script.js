const board = document.getElementById("board");
const maxCanvasWidth = board.offsetWidth;
const maxCanvasHeight = board.offsetHeight;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = maxCanvasWidth;
ctx.canvas.height = maxCanvasHeight;

let arr = [];
let numberOfBars = 50;
let barGap = 2;
let barWidth = maxCanvasWidth / numberOfBars - barGap;

for (let i = 0; i < numberOfBars; i++) {
  arr.push(Math.floor(Math.random() * maxCanvasHeight * 0.75));
}

function draw() {
  let barPos = barGap;
  for (let i = 0; i < arr.length; i++) {
    ctx.fillStyle = "#3b3b3b";
    ctx.fillRect(barPos, canvas.height - arr[i], barWidth, arr[i]);
    barPos += barWidth + barGap;
  }
}

draw();

// ctx.clearRect(0, 0, canvas.width, canvas.height);

// const intervalID = setInterval(() => {
//   draw();
// }, renderTime);
