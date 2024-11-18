
let toggle = false;
const canvas = document.getElementById('canvas'); 
const layer = document.getElementById("paintLayer");

canvas.addEventListener('mousedown', penDown); 
canvas.addEventListener('mouseup', penUp); 
canvas.addEventListener('mousemove', draw); 

layer.style.pointerEvents = 'none'; //allows you to click on buttons and the grid beneath the drawings, when not drawing


let tools = [true, false, false, false] //pencil, eraser, circle, square
function changeTool(num)
{
    for (let i = 0;i < tools.length; i++) {
        if(i == num) {
            tools[i] = true;
        } else {
            tools[i] = false;
        }
    }
}

function togglePaint() { //used for toggling whether or not you're actively drawing. prevents you from clicking on anything else if you are
    if(toggle == true) {
        toggle = false;
        layer.style.pointerEvents = 'none';
    } else {
        toggle = true;
        layer.style.pointerEvents = 'auto';
    }
}
   
const ctx = canvas.getContext('2d'); //establishes canvas
ctx.canvas.width = canvas.width; 
ctx.canvas.height = canvas.height; 

let coord = {x: 0, y: 0};  
function getPosition(event){ 
  coord.x = event.clientX - 15; 
  coord.y = event.clientY - 15; 
} 

let drawing = false; //variable for whether or not you're holding down the mouse to draw
let startPos;
function penDown(event){ 
  drawing = true; 
  getPosition(event); //tracks cursor positon when you are
  startPos = [coord.x, coord.y];
} 
function penUp(event){ 
  drawing = false;
  getPosition(event);
  if (tools[2] == true) {
    ctx.beginPath(); 
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    ctx.lineWidth = document.getElementById("lineWeight").value;
    let rectWidth = coord.x - startPos[0];
    let rectHeight = coord.y - startPos[1];
    ctx.rect(startPos[0], startPos[1], rectWidth, rectHeight);
    ctx.stroke();
  }
  if (tools[3] == true) {
    ctx.beginPath(); 
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    ctx.lineWidth = document.getElementById("lineWeight").value;
    let rectWidth = coord.x - startPos[0];
    let rectHeight = coord.y - startPos[1];
    ctx.ellipse(startPos[0], startPos[1], Math.abs(rectWidth), Math.abs(rectHeight), 0, 0, 2 * Math.PI);
    ctx.stroke();
  }
} 

function draw(event){ 
  if (drawing == true) {
    ctx.beginPath(); 
    ctx.lineCap = 'round';
    ctx.lineWidth = document.getElementById("lineWeight").value; 
    if (tools[0] == true) {
        ctx.strokeStyle = document.getElementById("colorPicker").value; 
        ctx.moveTo(coord.x, coord.y); 
        getPosition(event); 
        ctx.lineTo(coord.x , coord.y); 
        ctx.stroke(); 
    } if (tools[1] == true) {
        //eraser here
        ctx.clearRect(event.offsetX, event.offsetY, ctx.lineWidth,ctx.lineWidth);

    } 
  }


}
function clear_canvas(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
