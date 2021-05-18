const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const colorPicker = document.getElementById("colorPicker");
const buttonMode = document.getElementById("jsMode");
const buttonSave = document.getElementById("jsSave");
const current = document.getElementById("currentColor");
const eraser = document.getElementById("eraser");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;
let bgColor = "#fff";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = INITIAL_COLOR;

let isPainting = false;
let isFilling = false;

function stopPainting() {
  isPainting = false;
}

function startPainting() {
  isPainting = true;
}

function onMouseMove(event) {
  //console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x, y);
  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;

  current.style.backgroundColor = event.target.style.backgroundColor;
}

function changeRange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorPickerChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;

  current.style.backgroundColor = event.target.value;
}

function buttonModeChange() {
  if (isFilling) {
    isFilling = false;
    buttonMode.innerText = "FILL BG";
  } else {
    isFilling = true;
    buttonMode.innerText = "PAINT";
  }
}

function onMouseClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bgColor = ctx.fillStyle;
  }
}

function onEraserSelect() {
  ctx.strokeStyle = bgColor;
}

function onClickCM(event) {
  event.preventDefault();
}

function onClickSave() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");

  link.href = image;
  link.download = "MyCanvasImage";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", onMouseClick);
  canvas.addEventListener("contextmenu", onClickCM);
}

eraser.addEventListener("click", onEraserSelect);

colorPicker.addEventListener("change", onColorPickerChange);

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", changeRange);
}

if (buttonMode) {
  buttonMode.addEventListener("click", buttonModeChange);
}

if (buttonSave) {
  buttonSave.addEventListener("click", onClickSave);
}
