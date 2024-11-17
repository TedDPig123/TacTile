
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
function penDown(event){ 
  drawing = true; 
  getPosition(event); //tracks cursor positon when you are
} 
function penUp(){ 
  drawing = false; 
} 
    
function draw(event){ 
  if (drawing == true) {
    ctx.beginPath(); 
    ctx.lineCap = 'round';
    console.log(tools);
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
    } if (tools[2] == true) {
        //rectangle here
        if (!drawing) {
        // Save the starting point
            getPosition(event);
            coord.startX = coord.x;
            coord.startY = coord.y;
    } else {
        // Clear the canvas and redraw the rectangle
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.strokeStyle = document.getElementById("colorPicker").value;
            ctx.lineWidth = document.getElementById("lineWeight").value;
            let rectWidth = coord.x - coord.startX;
            let rectHeight = coord.y - coord.startY;
            ctx.strokeRect(coord.startX, coord.startY, rectWidth, rectHeight);
    } if (tools[3] == true) {
        //circle here
        //make circles when mousedown
        ctx.arc(coord.x, coord.y, ctx.lineWidth, 0, 2 * Math.PI);
        ctx.fillStyle = document.getElementById("colorPicker").value;;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = document.getElementById("colorPicker").value;
        ctx.stroke();
    }
  }


}
function clear_canvas(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
