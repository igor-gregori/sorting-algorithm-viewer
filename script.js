const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let arr = [];

for (let i = 0; i < 100; i++) {
  arr.push(Math.floor(Math.random() * 500));
}

const barWidth = 10;
let barPos = 10;
function draw() {
  // ctx.fillStyle = "white";
  // ctx.fillRect(10, canvas.height - 10, 10, 10);
  for (let i = 0; i < arr.length; i++) {
    ctx.fillStyle = "#3b3b3b";
    ctx.fillRect(barPos, canvas.height - arr[i], barWidth, arr[i]);
    barPos += barWidth + 2;
  }
}

draw();

// ctx.clearRect(0, 0, canvas.width, canvas.height);

// const intervalID = setInterval(() => {
//   draw();
// }, renderTime);
