The rectangle tool allows the user to draw rectangular shapes on the canvas. The tool is activated by clicking the third button on the tool list. The user can adjust the rectangle's border width by entering a number in the line width input box and can choose a border color using the color picker. To draw a rectangle, the user presses and holds the mouse button to set the starting point, moves the mouse to adjust the rectangle's size, and releases the mouse button to finalize the shape. While drawing, the rectangle is dynamically updated, providing real-time feedback.
```mermaid
sequenceDiagram
    User->>Browser: inputs a number for line width
    Browser->>paint.js: ctx.lineWidth is changed to be that number
    User->>Browser: click 3rd tool button
    Browser->>paint.js: trigger changeTool(2)
    User->>Browser: click paint checkbox
    Browser->>paint.js: User is now in drawing mode (toggle === true)
    User->>Browser: press down on mouse
    Browser->>paint.js: User is now in active drawing mode (drawing === true)
    Browser->>paint.js: getPosition(event)
    Browser->>paint.js: coord.startX = coord.x
    Browser->>paint.js: coord.startY = coord.y
    User->>Browser: moves mouse while pressing down
    Browser->>paint.js: ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    Browser->>paint.js: ctx.beginPath()
    Browser->>paint.js: ctx.strokeStyle = selectedColor
    Browser->>paint.js: ctx.lineWidth = selectedLineWidth
    Browser->>paint.js: calculate rectWidth and rectHeight
    Browser->>paint.js: ctx.strokeRect(coord.startX, coord.startY, rectWidth, rectHeight)
    User->>Browser: let go of mouse
    Browser->>paint.js: User is no longer in active drawing mode (drawing === false)
```
