var fontfamily = "65px 'Gill Sans Ultra Bold', sans-serif";
let ctx;
let savedgco;
let currentElementIndex;
let mouseX;
let mouseY;
let elemLeft;
let elemTop;
let canvas;
let thingInMotion;
let offsetLeft;
let offsetTop;

let elements = [];

const square = { x: 400, y: 400, w: 100, h: 150, color: "blue" };
const frame = {x: 0, y: 0, w: 800, h: 600, color: "#cccc"};

export function init(el) {
  canvas = el;
  canvas.onmousedown = function () {
    return false;
  };

  elemLeft = canvas.offsetLeft;
  elemTop = canvas.offsetTop;
  canvas.style.cursor = "crosshair";

  ctx = canvas.getContext("2d");
  savedgco = ctx.globalCompositeOperation;
  ctx.font = fontfamily;
  ctx.save();

  createElement();
  createFrame();
}

function createFrame(cb) {
  ctx.clearRect(frame.x, frame.y, frame.w, frame.h);
  ctx.strokeStyle = frame.color;
  ctx.lineWidth = 5;
  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);

  for (let i = 0; i < elements.length; i++) {
    draw(elements[i]);
  }

  requestAnimationFrame(createFrame);
}

function createElement() {
  elements.push(square);
}

export function draw({ x, y, w, h, color }) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  var shouldMove = Math.abs(x - mouseX) > 1 || Math.abs(y - mouseY) > 1;

  if (shouldMove) {
    x += w;
    y += h;
  } else {
    w = 0;
    h = 0;
  }
}

export function startdragging(e) {
  let xVal = e.pageX - elemLeft;
  let yVal = e.pageY - elemTop;

  elements.forEach((ele, i) => {
    if (
      yVal > ele.y &&
      yVal < ele.y + ele.h &&
      xVal > ele.x &&
      xVal < ele.x + ele.w
    ) {
      offsetLeft = xVal - ele.x;
      offsetTop = yVal - ele.y;
      canvas.style.cursor = "pointer";
      thingInMotion;
      const item = elements[i];
      elements.splice(i, 1);
      elements.push(item);
      currentElementIndex = i;
      canvas.addEventListener("mousemove", moveit, false);
    }
  });
}

function moveit(e) {
  let xVal = e.pageX - elemLeft;
  let yVal = e.pageY - elemTop;

  elements[currentElementIndex].x = xVal - offsetLeft;
  elements[currentElementIndex].y = yVal - offsetTop;

  createFrame();
}

export function dropit(es) {
  canvas.removeEventListener("mousemove", moveit, false);
  canvas.removeEventListener("mouseup", dropit, false);
  canvas.style.cursor = "crosshair"; //change back to crosshair
}
