The eraser feature allows the user to erase any marks created by the other drawing tools. The eraser acts as a pen with a transparent color. Its width is adjustable by entering a number in an input box and is activated by checking the paint button and selecting the second circle on the tool list.
```mermaid
sequenceDiagram
    User->>Browser: inputs a number for line width
    Browser->>paint.js: ctx.lineWidth is changed to be that number
    User->>Browser: click 2nd tool button
    Browser->>paint.js: trigger changeTool(1)
    User->>Browser: click paint checkbox
    Browser->>paint.js: User is now in drawing mode (toggle === true)
    User->>Browser: press down on mouse and moves
    Browser->>paint.js: User is now in active drawing mode (drawing === true)
    Browser->>paint.js: draw function is called with eraser tool
    paint.js->>Browser: area that is covered by cursor while in active drawing mode is erased
    User->>Browser: let go of mouse
    Browser->>paint.js: User is no longer in active drawing mode (drawing === false)
```
